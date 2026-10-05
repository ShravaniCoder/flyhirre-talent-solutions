require("dotenv").config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../src/models/User");
const connectDB = require("../src/config/db");

(async () => {
  try {
    await connectDB();
    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD || ADMIN_PASSWORD === "CHANGE_THIS_PASSWORD") {
      throw new Error("Set ADMIN_NAME, ADMIN_EMAIL and a real ADMIN_PASSWORD in .env first.");
    }
    const existing = await User.findOne({ email: ADMIN_EMAIL.toLowerCase() });
    if (existing) {
      existing.name = ADMIN_NAME;
      existing.password = await bcrypt.hash(ADMIN_PASSWORD, 12);
      existing.role = "admin";
      await existing.save();
      console.log(`Admin updated: ${ADMIN_EMAIL}`);
    } else {
      const password = await bcrypt.hash(ADMIN_PASSWORD, 12);
      await User.create({ name: ADMIN_NAME, email: ADMIN_EMAIL.toLowerCase(), password, role: "admin" });
      console.log(`Admin created: ${ADMIN_EMAIL}`);
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close().catch(() => {});
  }
})();
