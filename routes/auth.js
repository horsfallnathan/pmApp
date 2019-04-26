const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

router.get('/login', (req, res, next) => {
    res.render('auth/login', { message: req.flash('error'), layout: 'welcome-layout' });
});

router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login',
        failureFlash: true,
        passReqToCallback: true
    })
);

router.get('/signup', (req, res, next) => {
    res.render('auth/signup', { layout: 'welcome-layout' });
});

router.post('/signup', (req, res, next) => {
    const { firstName, lastName, email, username, password, passwordConfirm } = req.body;
    if (username === '' || password === '') {
        res.render('auth/signup', { message: 'Indicate username and password' });
        return;
    }

    if (password !== passwordConfirm) {
        res.render('auth/signup', { message: "The passwords didn't match. Please try again." });
        return;
    }

    User.findOne({ username }, 'username', (err, user) => {
        if (user !== null) {
            res.render('auth/signup', { message: 'The username already exists' });
            return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            username,
            password: hashPass
        });

        newUser
            .save()
            .then(user => {
                // log in a newly signed up user
                req.login(user, () => {
                    //res.redirect("/auth/personalize")
                    res.render('auth/signup');
                });
            })
            .catch(err => {
                res.render('auth/signup', { message: 'Something went wrong', err });
            });
    });
});

router.get('/github', passport.authenticate('github'));
router.get(
    '/github/callback',
    passport.authenticate('github', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login'
    })
);

router.get('/linkedin', passport.authenticate('linkedin'));
router.get(
    '/linkedin/callback',
    passport.authenticate('linkedin', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login'
    })
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// geo + industry select
router.get('/personalize', (req, res) => {
    res.render('auth/personalize', { layout: 'welcome-layout' });
});

router.post('/personalize', (req, res, next) => {
    const { country, industry } = req.body;
    console.log('this is signup country', country);
    console.log('this is signup industry', industry);
    res.redirect('/dashboard');
});

module.exports = router;
