const StaffAdmin = require("../models/staffAdminModels.js");
const { validateUser} = require("../validation/userValidation");
const bcrypt = require("bcryptjs");

// Create a new staff admin
const createStaffAdmin = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // Validate input
    const { isValid, errors } = validateUser({ email, password, confirmPassword });
    if (!isValid) {
      return res.status(400).json({ success: false, errors });
    }

    // Check if email already exists
    const existingAdmin = await StaffAdmin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new staff admin
    const newAdmin = new StaffAdmin({
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword, // Store hashed confirmPassword for consistency
    });

    await newAdmin.save();
    res.status(201).json({ success: true, message: "Staff admin created successfully." });
  } catch (err) {
    console.error("Error creating staff admin:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
// get all staff admins
const getAllStaffAdmins = async (req, res) => {
  try {
    const staffAdmins = await StaffAdmin.find();
    res.status(200).json({ success: true, data: staffAdmins });
  } catch (err) {
    console.error("Error fetching staff admins:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = { createStaffAdmin, getAllStaffAdmins };