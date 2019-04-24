// Setting required modules
const express = require("express")
const passport = require("passport")
const router = express.Router()
const User = require("../models/User")
const Project = require("../models/Project")
const Task = require("../models/Task")

const NewsAPI = require("newsapi")
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY)

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt")
const bcryptSalt = 10

// authentication middleware
const authenticationCheck = (req, res, next) => {
  if (req.isAuthenticated()) next()
  else res.render("error", { errorMessage: "You need to Login to access this page" })
}

router.get("/dashboard", authenticationCheck, (req, res, next) => {
  res.render("signedIn/dashboard")
})

router.get("/add-project", authenticationCheck, (req, res, next) => {
  res.render("signedIn/add-project")
})

router.post("/addProject", authenticationCheck, (req, res, next) => {
  const { inputTitle } = req.body
  console.log(inputTitle)
  Project.create({ projectName: inputTitle, assignedTo: req.user._id })
    .then(project => {
      id = project._id
      content = project.inputTitle
      console.log("added")
      res.render("signedIn/add-project", { id, content })
    })
    .catch(err => {
      console.error("Error while adding a new project", err)
    })
})

router.get("/api/project", (req, res, next) => {
  Project.find().then(data => res.json(data))
})

// NewsAPI for the widget
router.get("/api/news", (req, res, next) => {
  newsapi.v2
    .topHeadlines({
      category: "general",
      country: "us"
    })
    .then(response => {
      res.json(response)
    })
    .catch(err => {
      console.error("Could not fetch news", err)
    })
})

module.exports = router
