const mongoose = require("mongoose");


const staffAdminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, default: "staff_admin" },
    githubId: { type: String, unique: true }, // store GitHub id
  },
  { timestamps: true, collection: "staff_admins" }
);

const staffAdminModels = mongoose.model("StaffAdmin", staffAdminSchema);

module.exports = staffAdminModels;
