// Simple user validation for staff admin API
const validateUser = (data) => {
  const errors = {};

  if (!data.email || typeof data.email !== "string") {
    errors.email = "Email is required and must be a string.";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email is invalid.";
  }

  if (!data.password || typeof data.password !== "string") {
    errors.password = "Password is required and must be a string.";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  if (data.confirmPassword !== data.password) {
    errors.confirmPassword = "Confirm password must match password.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

module.exports = { validateUser }; 