// Setting required modules
<<<<<<< HEAD
const express = require("express")
const router = express.Router()
const User = require("../models/User")
=======
const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');
>>>>>>> dashboard

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt")
const bcryptSalt = 10

// authentication middleware
const authenticationCheck = (req, res, next) => {
<<<<<<< HEAD
  console.log("maybe here")
  if (req.isAuthenticated()) next()
  else res.render("error", { errorMessage: "You need to Login to access this page" })
}
=======
    if (req.isAuthenticated()) next();
    else res.render('error', { errorMessage: 'You need to Login to access this page' });
};
>>>>>>> dashboard

router.get("/dashboard", authenticationCheck, (req, res, next) => {
  res.render("signedIn/dashboard")
})

<<<<<<< HEAD
router.get("/addProject", authenticationCheck, (req, res, next) => {
  res.render("signedIn/add-project")
})

router.post("/rooms/add", authenticationCheck, (req, res, next) => {
  const { projectName, task, assignedUser, description, weight } = req.body
  console.log(req.user._id)
  Project.create({ projectName, task, assignedUser, description, weight, owner: req.user._id })
    .then(project => {
      res.redirect("/signedIn/dashboard")
    })
    .catch(err => {
      console.error("Error while adding a new project", err)
    })
})

// router.get("/news", (req, res, next) => {
//   res.render("signedIn/news")
// })

module.exports = router
=======
router.get('/add-project', authenticationCheck, (req, res, next) => {
    res.render('signedIn/add-project');
});

router.post('/addProject', authenticationCheck, (req, res, next) => {
    const { inputTitle } = req.body;
    console.log(inputTitle);
    Project.create({ projectName: inputTitle, assignedTo: req.user._id })
        .then(project => {
            id = project._id;
            content = project.inputTitle;
            console.log('added');
            res.render('signedIn/add-project', { id, content });
        })
        .catch(err => {
            console.error('Error while adding a new project', err);
        });
});

router.get('/api/project', (req, res, next) => {
    Project.find().then(data => res.json(data));
});

module.exports = router;
>>>>>>> dashboard
