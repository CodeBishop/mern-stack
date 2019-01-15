// A file for dealing with authentication (username, email, password, etc.)
const express = require('express')
const router = express.Router()

// @route GET api/posts/test
// @desc Tests post route
// @access Public
router.get('/test', (req, res) => res.json({msg: "posts.js works!"}))

module.exports = router