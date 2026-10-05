const express = require("express");
const {
  createContact,
  getContacts
} = require("../controllers/contactController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createContact);
router.get("/", protect, adminOnly, getContacts);

module.exports = router;
