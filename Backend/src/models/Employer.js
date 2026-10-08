const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    workEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: { type: String, required: true, trim: true },

    industry: {
      type: String,
      required: true,
      trim: true,
    },

    recruitmentType: {
      type: String,
      trim: true,
    },

    // New frontend field.
    hiringRole: {
      type: String,
      required: true,
      trim: true,
    },

    // Kept for backward compatibility with older employer records/admin UI.
    // New submissions automatically copy hiringRole into this field.
    hiringFunction: {
      type: String,
      trim: true,
      select: false,
    },

    numberOfPositions: {
      type: Number,
      min: 1,
      default: 1,
    },

    requirementDetails: {
      type: String,
      required: true,
      trim: true,
    },

    companyVerificationDocuments: [
      {
        documentType: String,
        originalName: String,
        fileName: String,
        path: String,
        mimeType: String,
        size: Number,
      },
    ],

    verificationStatus: {
      type: String,
      enum: [
        "PENDING",
        "UNDER_REVIEW",
        "VERIFIED",
        "NEEDS_MORE_DOCUMENTS",
        "REJECTED",
      ],
      default: "PENDING",
    },

    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "IN_PROGRESS", "CLOSED"],
      default: "NEW",
    },

    adminNotes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employer", employerSchema);
