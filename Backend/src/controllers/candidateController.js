const fs = require("fs");
const Candidate = require("../models/Candidate");
const { isValidIndustry, isValidIndustryRole } = require("../config/industryRoles");

const removeUploadedFile = (file) => {
  if (!file?.path) return;

  fs.unlink(file.path, () => {
    // Ignore cleanup errors.
  });
};

const createCandidate = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      industry,
      candidateRole,
    } = req.body;

    if (!fullName || !email || !phone) {
      removeUploadedFile(req.file);
      return res.status(400).json({
        success: false,
        message: "Full name, email and phone are required.",
      });
    }

    if (!industry) {
      removeUploadedFile(req.file);
      return res.status(400).json({
        success: false,
        message: "Please select an industry.",
      });
    }

    if (!candidateRole) {
      removeUploadedFile(req.file);
      return res.status(400).json({
        success: false,
        message: "Please select a candidate role.",
      });
    }

    if (!isValidIndustry(industry)) {
      removeUploadedFile(req.file);
      return res.status(400).json({
        success: false,
        message: "Invalid industry selected.",
      });
    }

    if (!isValidIndustryRole(industry, candidateRole)) {
      removeUploadedFile(req.file);
      return res.status(400).json({
        success: false,
        message: "The selected candidate role does not belong to the selected industry.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload your CV / Resume.",
      });
    }

    const candidate = await Candidate.create({
      ...req.body,
      cv: {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        path: `/uploads/candidates/${req.file.filename}`,
        mimeType: req.file.mimetype,
        size: req.file.size,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Your profile and CV were submitted successfully.",
      data: candidate,
    });
  } catch (error) {
    console.error("Candidate submission error:", error);
    removeUploadedFile(req.file);

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
      message: "Failed to submit candidate profile.",
    });
  }
};

const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find()
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: candidates.length,
      data: candidates,
    });
  } catch (error) {
    console.error("Fetch candidates error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch candidates.",
    });
  }
};

const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!candidate) {
      return res.status(404).json({
        success: false,
        message: "Candidate not found.",
      });
    }

    return res.json({
      success: true,
      data: candidate,
    });
  } catch (error) {
    console.error("Update candidate error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update candidate.",
    });
  }
};

module.exports = {
  createCandidate,
  getCandidates,
  updateCandidate,
};
