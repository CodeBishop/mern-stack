// A file for dealing with authentication (username, email, password, etc.)
const bcrypt = require('bcryptjs')
const express = require('express')
const gravatar = require('gravatar')
const router = express.Router()
const User = require('../../models/User')

// @route GET /api/users/test
// @desc Users post route
// @access Public
router.get('/test', (req, res) => res.json({msg: "users.js works!"}))

// @route POST /api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      // Reject user creation if email address already in use.
      if(user) {
        return res.status(400).json({email: 'Email already exists'})
      } else {
        // Fetch an avatar image from Gravatar if the user's email is from there.
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size (in pixels)
          r: 'pg', // Rating
          d: 'mm' // Default
        })

        // Create a new user object.
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        })

        // Salt and hash the new user's password.
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err
            newUser.password = hash
            // Save the new user object and return it as a response.
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    })
})

module.exports = router