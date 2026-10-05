const Employer = require("../models/Employer");

const createEmployer = async (req, res) => {
  try {
    const { fullName, companyName, workEmail, phone, requirementDetails } = req.body;
    if (!fullName || !companyName || !workEmail || !phone || !requirementDetails) {
      return res.status(400).json({ success: false, message: "Please complete all required employer fields." });
    }

    const fieldLabels = {
      incorporationDocument: "Company Registration / Incorporation Certificate",
      gstDocument: "GST Certificate",
      panDocument: "Company PAN",
      authorizationDocument: "Authorisation / Other Company Document",
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
      return res.status(400).json({ success: false, message: "Please upload at least one company verification document." });
    }

    const employer = await Employer.create({
      ...req.body,
      numberOfPositions: Number(req.body.numberOfPositions || 1),
      companyVerificationDocuments: documents,
    });

    res.status(201).json({ success: true, message: "Hiring requirement and company documents were submitted successfully.", data: employer });
  } catch (error) {
    console.error("Employer submission error:", error);
    res.status(500).json({ success: false, message: "Failed to submit employer requirement." });
  }
};

const getEmployers = async (req, res) => {
  try {
    const employers = await Employer.find().sort({ createdAt: -1 });
    res.json({ success: true, count: employers.length, data: employers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch employers." });
  }
};

const updateEmployer = async (req, res) => {
  try {
    const employer = await Employer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!employer) return res.status(404).json({ success: false, message: "Employer not found." });
    res.json({ success: true, data: employer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update employer." });
  }
};

module.exports = { createEmployer, getEmployers, updateEmployer };
