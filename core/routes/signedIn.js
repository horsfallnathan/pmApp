// Setting required modules
const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

router.get('/dashboard', (req, res, next) => {
    res.render('signedIn/dashboard', { message: req.flash('error') });
});

module.exports = router;
