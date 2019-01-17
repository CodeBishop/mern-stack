// A file for stuff related to the in-depth profiles of users (location, bio, social network links, etc).
// A file for dealing with authentication (username, email, password, etc.)
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const Profile = require('../../models/Profile')
const router = express.Router()
const User = require('../../models/User')

// @route GET api/profile/test
// @desc Test profile route
// @access Public
router.get('/test', (req, res) => res.json({msg: "profile.js works!"}))

// @route GET api/profile
// @desc Get current user's profile
// @access Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  const errors = {}
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if(!profile) {
        errors.noprofile = 'There is no profile for this user'
        return res.status(404).json(errors)
      } else {
        res.json(profile)
      }
    }).catch(err => res.status(404).json(err))
  }
)

module.exports = router