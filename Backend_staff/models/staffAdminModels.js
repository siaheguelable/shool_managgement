const mongoose = require("mongoose");


const staffAdminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, default: "staff_admin" },
  },
  { timestamps: true, collection: "staff_admins_v2" } // changed collection name
);

const staffAdminModels = mongoose.model("StaffAdmin", staffAdminSchema);

module.exports = staffAdminModels;
