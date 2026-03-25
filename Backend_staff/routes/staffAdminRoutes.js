const routes = require("express").Router();
const staffAdminController = require("../controllers/staffAdminController");
// Define routes for staff admins

routes.get("/staff-admins", staffAdminController.getStaffAdmins);
routes.post("/staff-admins", staffAdminController.createStaffAdmin);

module.exports = routes; 