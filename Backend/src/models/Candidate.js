const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    currentLocation: { type: String, trim: true },
    totalExperience: { type: String, trim: true },
    currentRole: { type: String, trim: true },

    // Industry selected by the candidate.
    industry: {
      type: String,
      required: true,
      trim: true,
    },

    // Role selected by the candidate based on the selected industry.
    candidateRole: {
      type: String,
      required: true,
      trim: true,
    },

    employmentPreference: { type: String, trim: true },
    preferredLocation: { type: String, trim: true },
    linkedinProfile: { type: String, trim: true },
    availability: { type: String, trim: true },
    additionalInformation: { type: String, trim: true },

    cv: {
      originalName: String,
      fileName: String,
      path: String,
      mimeType: String,
      size: Number,
    },

    status: {
      type: String,
      enum: [
        "NEW",
        "REVIEWING",
        "SHORTLISTED",
        "CONTACTED",
        "REJECTED",
        "HIRED",
      ],
      default: "NEW",
    },

    adminNotes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateSchema);
