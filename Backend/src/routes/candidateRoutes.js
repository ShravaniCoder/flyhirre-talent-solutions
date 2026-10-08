const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  createCandidate,
  getCandidates,
  updateCandidate,
} = require("../controllers/candidateController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

const uploadDir = path.join(
  __dirname,
  "../../uploads/candidates"
);

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, uploadDir);
  },

  filename: (_, file, cb) => {
    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    cb(
      null,
      `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${extension}`
    );
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },

  fileFilter: (_, file, cb) => {
    const allowedMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(
      new Error(
        "CV must be a PDF, DOC or DOCX file."
      )
    );
  },
});

router.post(
  "/",
  upload.single("cv"),
  createCandidate
);

router.get(
  "/",
  protect,
  adminOnly,
  getCandidates
);

router.patch(
  "/:id",
  protect,
  adminOnly,
  updateCandidate
);

module.exports = router;
