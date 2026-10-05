const Candidate = require("../models/Candidate");

const createCandidate = async (req, res) => {
  try {
    if (!req.body.fullName || !req.body.email || !req.body.phone) {
      return res.status(400).json({ success: false, message: "Full name, email and phone are required." });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Please upload your CV / Resume." });
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

    res.status(201).json({ success: true, message: "Your profile and CV were submitted successfully.", data: candidate });
  } catch (error) {
    console.error("Candidate submission error:", error);
    res.status(500).json({ success: false, message: "Failed to submit candidate profile." });
  }
};

const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    res.json({ success: true, count: candidates.length, data: candidates });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch candidates." });
  }
};

const updateCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!candidate) return res.status(404).json({ success: false, message: "Candidate not found." });
    res.json({ success: true, data: candidate });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update candidate." });
  }
};

module.exports = { createCandidate, getCandidates, updateCandidate };
