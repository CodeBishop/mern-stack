const isEmpty = require('./is-empty.js')
const Validator = require('validator')

module.exports = function validateProfileInput(data) {
  let errors = {}

  // Force any null/undefined/empty fields to be empty strings.
  data.handle = !isEmpty(data.handle) ? data.handle : ''
  data.status = !isEmpty(data.status) ? data.status : ''
  data.skills = !isEmpty(data.skills) ? data.skills : ''
 
  // Test that handle field is valid.
  if(Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required'
  } else if(!Validator.isLength(data.handle, { min: 2, max: 40})) {
    errors.handle = 'Handle must be between 2 and 40 characters'
  }

  // Test that skills field is valid.
  if(Validator.isEmpty(data.skills)) {
    errors.skills = 'Profile skills is required'
  }

  // Test that status field is valid.
  if(Validator.isEmpty(data.status)) {
    errors.status = 'Profile status is required'
  }

  // Check that URL fields are valid.
  ;['website', 'twitter', 'facebook', 'linkedin', 'instagram'].forEach(site => {
    if(!isEmpty(data[site]) && !Validator.isURL(data[site])) {
      errors[site] = 'Not a valid URL'
    }
  })

  // Return the errors that were found or an isValid:true if no errors were found.
  return {
    errors,
    isValid: isEmpty(errors)
  }
}