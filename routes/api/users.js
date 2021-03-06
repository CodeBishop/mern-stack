// A file for dealing with authentication (username, email, password, etc.)
const bcrypt = require('bcryptjs')
const express = require('express')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const router = express.Router()
const User = require('../../models/User')
const validateLoginInput = require('../../validation/login')
const validateRegisterInput = require('../../validation/register')

// @route GET /api/users/test
// @desc Users post route
// @access Public
router.get('/test', (req, res) => res.json({msg: "users.js works!"}))

// @route POST /api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)
  
  // Validate fields.
  if(!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      // Reject user creation if email address already in use.
      if(user) {
        errors.email = 'Email already exists'
        return res.status(400).json(errors)
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

// @route POST /api/users/login
// @desc Register user
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)
  
  // Validate fields.
  if(!isValid) {
    return res.status(400).json(errors)
  }
  
  const email = req.body.email
  const password = req.body.password

  // Find the user by email.
  // NOTE: This is a practice web app and as such it will tell the user whether their email address or password is incorrect. In the real world it is best practice to only say "username or password not correct" so that an attacker cannot build a username list.
  User.findOne({email})
    .then(user => {
      // Bail out if user was not found.
      if(!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors)
      } else {
        // Check if password matches the hashed password in our database.
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              // User was found, create JWT payload.
              const payload = { id: user.id, name: user.name, avatar: user.avatar }
              
              // Sign token and attach to response.
              jwt.sign(payload, keys.secretOrKey, { expiresIn: 2592000 }, (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
              })
            } else {
              errors.password = "Password incorrect"
              return res.status(400).json(errors)
            }
          })
      }
    })
})

// @route GET /api/users/current
// @desc Return current user
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false}), (req, res) => {
  // Respond with a user object that does not include the password.
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})


module.exports = router