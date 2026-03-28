const mongoose = require("mongoose");



const staffAdminSchema = new mongoose.Schema(
  {
   
    email: { type: String, unique: true },
    password: { type: String },
    confirmPassword: { type: String },
    githubId: {
  type: String,
  unique: true,
  sparse: true
}

    
  },
  { timestamps: true, collection: "staff_admins" } // changed collection name
);

const staffAdminModels = mongoose.model("StaffAdmin", staffAdminSchema);

module.exports = staffAdminModels;
