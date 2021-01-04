const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.first_name, { min: 2, max: 30 })) {
    errors.first_name = "Name must be between 2 and 30 characters";
  }
  if (!Validator.isLength(data.last_name, { min: 2, max: 30 })) {
    errors.last_name = "Name must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "first_name field is required";
  }
  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = "last_name field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
