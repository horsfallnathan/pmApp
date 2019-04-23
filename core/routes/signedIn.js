// Setting required modules
const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const Project = require('../models/Project');
const Task = require('../models/Task');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

// authentication middleware
const authenticationCheck = (req, res, next) => {
    if (req.isAuthenticated()) next();
    else res.render('error', { errorMessage: 'You need to Login to access this page' });
};

router.get('/dashboard', authenticationCheck, (req, res, next) => {
    res.render('signedIn/dashboard');
});

let inFormData;
router.post('/api/addProject', authenticationCheck, (req, res, next) => {
    const { inputTitle } = req.body;
    return Project.create({ projectName: inputTitle, assignedTo: [req.user._id] })
        .then(project => {
            inFormData = res.json(project);
            return inFormData;
        })
        .catch(err => {
            console.error('Error while adding a new project', err);
        });
});

router.post('/api/addTask', authenticationCheck, (req, res, next) => {
    const { taskTitle, description, weight, status, project = inFormData.data._id } = req.body;
    Task.create({
        title: taskTitle,
        description: description,
        assignedTo: req.user._id,
        weight: weight,
        status: status,
        project: project
    })
        .then(project => {})
        .catch(err => {
            console.error('Error while adding a new project', err);
        });
});
router.get('/add-project', authenticationCheck, (req, res, next) => {
    res.render('signedIn/add-project');
});
router.get('/api/project', (req, res, next) => {
    Project.find().then(data => res.json(data));
});

module.exports = router;
