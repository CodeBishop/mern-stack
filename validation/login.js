const isEmpty = require('./is-empty.js')
const Validator = require('validator')

module.exports = function validateRegisterInput(data) {
  let errors = {}

  // Force any null/undefined/empty fields to be empty strings.
  data.email = !isEmpty(data.email) ? data.email : ''
  data.password = !isEmpty(data.password) ? data.password : ''
 
  // Test that email field is valid.
  if(Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required'
  } else if(!Validator.isEmail(data.email)) {
    errors.email = 'Email address is invalid'
  }
  
  // Test that password field is valid.
  if(Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'
  } else if(!Validator.isLength(data.password, { min: 6, max: 30})) {
    errors.password = 'Password must be between 6 and 30 characters'
  }

  // Return the errors that were found or an isValid:true if no errors were found.
  return {
    errors,
    isValid: isEmpty(errors)
  }
}