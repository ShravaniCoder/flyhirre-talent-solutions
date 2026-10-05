const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { createEmployer, getEmployers, updateEmployer } = require("../controllers/employerController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();
const uploadDir = path.join(__dirname, "../../uploads/employers");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname).toLowerCase()}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 4 },
  fileFilter: (_, file, cb) => {
    const allowed = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) return cb(null, true);
    cb(new Error("Company documents must be PDF, JPG, PNG or WEBP files."));
  },
});

router.post("/", upload.fields([
  { name: "incorporationDocument", maxCount: 1 },
  { name: "gstDocument", maxCount: 1 },
  { name: "panDocument", maxCount: 1 },
  { name: "authorizationDocument", maxCount: 1 },
]), createEmployer);
router.get("/", protect, adminOnly, getEmployers);
router.patch("/:id", protect, adminOnly, updateEmployer);

module.exports = router;
