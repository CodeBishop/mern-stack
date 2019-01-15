// A file for stuff related to the in-depth profiles of users (location, bio, social network links, etc).
// A file for dealing with authentication (username, email, password, etc.)
const express = require('express')
const router = express.Router()

// @route GET api/profile/test
// @desc Profile profile route
// @access Public
router.get('/test', (req, res) => res.json({msg: "profile.js works!"}))

module.exports = router