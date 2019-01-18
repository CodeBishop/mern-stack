const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};

  // Check for empty fields.
  ;['school', 'degree', 'fieldofstudy', 'from'].forEach(field => {
    // Convert empty fields to empty strings for Validator.
    data[field] = !isEmpty(data[field]) ? data[field] : ''
    // Use Validator to test for empty strings.
    if (Validator.isEmpty(data[field])) {
      errors[field] = field + ' field is required'
    }
  })

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
