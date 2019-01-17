// A helper function that returns true if the given value is undefined, null, {} or "" (empty object/string).
const isEmpty = value => 
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)


module.exports = isEmpty