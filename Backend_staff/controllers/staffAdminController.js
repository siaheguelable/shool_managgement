const userModel = require("../models/staffAdminModels.js");
const { validateUser } = require("../validation/userValidation");


// Get all staff admins (API)
exports.getStaffAdmins = async (req, res) => {
  try {
    const staffAdmins = await userModel.find();
    res.status(200).json({ message: "Staff admins retrieved", data: staffAdmins });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving staff admins", error });
  }
};

// Create a new user  (API)
exports.createStaffAdmin= async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    const errors = validateUser(newUser);
    if (errors.length > 0) {
      return res.status(400).json({ message: "Validation errors", errors });
    }
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};