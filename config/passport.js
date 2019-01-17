const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')

const User = mongoose.model('users')
const keys = require('../config/keys')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        // If user was found that matches id from token.
        if(user) {
          // Return no error and the user.
          return done(null, user)
        // If no user was found matching the id.
        } else {
          // Return no error and no user.
          return done(null, false)
        }
      }).catch(err => console.log(err))
  }))
}