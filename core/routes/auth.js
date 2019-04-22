const express = require("express")
const passport = require("passport")
const router = express.Router()
const User = require("../models/User")

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt")
const bcryptSalt = 10

router.get("/login", (req, res, next) => {
  res.render("auth/login", { message: req.flash("error") })
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  })
)

router.get("/signup", (req, res, next) => {
  res.render("auth/signup", { layout: "welcome-layout" })
})

router.post("/signup", (req, res, next) => {
  const { firstName, lastName, email, username, password, passwordConfirm } = req.body
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" })
    return
  }

  if (password !== passwordConfirm) {
    res.render("auth/signup", { message: "The passwords didn't match. Please try again." })
    return
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" })
      return
    }

    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashPass
    })

    newUser
      .save()
      .then(() => {
        res.redirect("/")
      })
      .catch(err => {
        res.render("auth/signup", { message: "Something went wrong" })
      })
  })
})

router.get("/github", passport.authenticate("github"))
router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/auth/login"
  })
)

router.get("/linkedin", passport.authenticate("linkedin"))
router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: "/",
    failureRedirect: "/auth/login"
  })
)

router.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/")
})
module.exports = router
