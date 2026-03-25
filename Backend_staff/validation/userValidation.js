// Simple user validation for staff admin API
exports.validateUser = (user) => {
  const errors = [];

  if (!user.name || typeof user.name !== 'string') {
    errors.push({ field: 'name', message: 'Name is required and must be a string.' });
  }

  if (!user.email || typeof user.email !== 'string') {
    errors.push({ field: 'email', message: 'Email is required and must be a string.' });
  }

  if (!user.password || typeof user.password !== 'string') {
    errors.push({ field: 'password', message: 'Password is required and must be a string.' });
  }

  return errors;
};