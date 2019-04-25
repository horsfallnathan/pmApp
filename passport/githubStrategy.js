const passport = require("passport")
const GithubStrategy = require("passport-github").Strategy
const User = require("../models/User")

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_CLIENT_ID,
      clientSecret: process.env.GH_CLIENT_SECRET,
      callbackURL: window.location.protocol + "//" + window.location.host + "/auth/github/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      User.findOne({ githubId: profile.id })
        .then(user => {
          if (user) return done(null, user)
          User.create({ githubId: profile.id }).then(newUser => {
            done(null, newUser)
          })
        })
        .catch(err => {
          done(err)
        })
    }
  )
)
