const passport = require("passport")
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy
const User = require("../models/User")

passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LI_CLIENT_ID,
      clientSecret: process.env.LI_CLIENT_SECRET,
      callbackURL: window.location.protocol + "//" + window.location.host + "/auth/linkedin/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      User.findOne({ linkedInId: profile.id })
        .then(user => {
          if (user) return done(null, user)
          User.create({ linkedInId: profile.id }).then(newUser => {
            done(null, newUser)
          })
        })
        .catch(err => {
          done(err)
        })
    }
  )
)
