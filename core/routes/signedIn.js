// Setting required modules
const express = require('express');
// const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

// authentication middleware
const authenticationCheck = (req, res, next) => {
    console.log('maybe here');
    if (req.isAuthenticated()) next();
    else res.render('error', { errorMessage: 'You need to Login to access this page' });
};

router.get('/dashboard', authenticationCheck, (req, res, next) => {
    res.render('signedIn/dashboard');
});

router.get('/add-project', authenticationCheck, (req, res, next) => {
    res.render('signedIn/add-project');
});

router.post('/addProject', authenticationCheck, (req, res, next) => {
    const { projectName, task, assignedUser, description, weight } = req.body;
    console.log(req.user._id);
    Project.create({ projectName, task, assignedUser, description, weight, owner: req.user._id })
        .then(project => {
            res.redirect('/signedIn/dashboard');
        })
        .catch(err => {
            console.error('Error while adding a new project', err);
        });
});

// router.get('/getTasks', (req, res, next) => {
//     Project.find().then(data => {
//         res.json(data);
//     });
// });

module.exports = router;
