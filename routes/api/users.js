// A file for dealing with authentication (username, email, password, etc.)
const express = require('express')
const router = express.Router()
const User = require('../../models/User')

// @route GET api/users/test
// @desc Users post route
// @access Public
router.get('/test', (req, res) => res.json({msg: "users.js works!"}))

// @route GET api/users/test
// @desc Users post route
// @access Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        return res.status(400).json({email: 'Email already exists'})
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        })
      }
    })
})

module.exports = router