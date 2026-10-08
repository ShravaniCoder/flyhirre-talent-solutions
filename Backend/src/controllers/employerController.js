const fs = require("fs");
const Employer = require("../models/Employer");
const {
  isValidIndustry,
  isValidIndustryRole,
} = require("../config/industryRoles");

const removeUploadedFiles = (files) => {
  if (!files) return;

  Object.values(files)
    .flat()
    .forEach((file) => {
      if (file?.path) {
        fs.unlink(file.path, () => {
          // Ignore cleanup errors.
        });
      }
    });
};

const createEmployer = async (req, res) => {
  try {
    const {
      fullName,
      companyName,
      workEmail,
      phone,
      industry,
      hiringRole,
      requirementDetails,
    } = req.body;

    if (
      !fullName ||
      !companyName ||
      !workEmail ||
      !phone ||
      !requirementDetails
    ) {
      removeUploadedFiles(req.files);

      return res.status(400).json({
        success: false,
        message:
          "Please complete all required employer fields.",
      });
    }

    if (!industry) {
      removeUploadedFiles(req.files);

      return res.status(400).json({
        success: false,
        message: "Please select an industry.",
      });
    }

    if (!hiringRole) {
      removeUploadedFiles(req.files);

      return res.status(400).json({
        success: false,
        message: "Please select a hiring role.",
      });
    }

    if (!isValidIndustry(industry)) {
      removeUploadedFiles(req.files);

      return res.status(400).json({
        success: false,
        message: "Invalid industry selected.",
      });
    }

    if (!isValidIndustryRole(industry, hiringRole)) {
      removeUploadedFiles(req.files);

      return res.status(400).json({
        success: false,
        message:
          "The selected hiring role does not belong to the selected industry.",
      });
    }

    const fieldLabels = {
      incorporationDocument:
        "Company Registration / Incorporation Certificate",
      gstDocument: "GST Certificate",
      panDocument: "Company PAN",
      authorizationDocument:
        "Authorisation / Other Company Document",
    };

    const documents = [];

    for (const [field, label] of Object.entries(fieldLabels)) {
      const file = req.files?.[field]?.[0];

      if (file) {
        documents.push({
          documentType: label,
          originalName: file.originalname,
          fileName: file.filename,
          path: `/uploads/employers/${file.filename}`,
          mimeType: file.mimetype,
          size: file.size,
        });
      }
    }

    if (!documents.length) {
      removeUploadedFiles(req.files);

      return res.status(400).json({
        success: false,
        message:
          "Please upload at least one company verification document.",
      });
    }

    const employer = await Employer.create({
      ...req.body,

      numberOfPositions: Math.max(
        1,
        Number(req.body.numberOfPositions || 1)
      ),

      // Keep old field populated so your current admin dashboard
      // remains compatible until it is updated to hiringRole.
      hiringFunction: hiringRole,

      companyVerificationDocuments: documents,
    });

    return res.status(201).json({
      success: true,
      message:
        "Hiring requirement and company documents were submitted successfully.",
      data: employer,
    });
  } catch (error) {
    console.error("Employer submission error:", error);
    removeUploadedFiles(req.files);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)
          .map((item) => item.message)
          .join(" "),
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to submit employer requirement.",
    });
  }
};

const getEmployers = async (req, res) => {
  try {
    // Explicitly include the legacy field because the schema marks
    // it select:false for new application code.
    const employers = await Employer.find()
      .select("+hiringFunction")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: employers.length,
      data: employers,
    });
  } catch (error) {
    console.error("Fetch employers error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch employers.",
    });
  }
};

const updateEmployer = async (req, res) => {
  try {
    const updates = { ...req.body };

    // If an admin updates hiringRole, keep the old field synchronized
    // for backward compatibility with the current admin application.
    if (updates.hiringRole) {
      updates.hiringFunction = updates.hiringRole;
    }

    const employer = await Employer.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    ).select("+hiringFunction");

    if (!employer) {
      return res.status(404).json({
        success: false,
        message: "Employer not found.",
      });
    }

    return res.json({
      success: true,
      data: employer,
    });
  } catch (error) {
    console.error("Update employer error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update employer.",
    });
  }
};

module.exports = {
  createEmployer,
  getEmployers,
  updateEmployer,
};
