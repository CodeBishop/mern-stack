// A file for dealing with authentication (username, email, password, etc.)
const express = require('express')
const router = express.Router()

// @route GET api/users/test
// @desc Users post route
// @access Public
router.get('/test', (req, res) => res.json({msg: "users.js works!"}))

module.exports = router