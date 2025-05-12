const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register Page
router.get('/register', (req, res) => {
    res.render('register');
});

// Handle Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        req.session.userId = user._id;
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Registration Failed');
    }
});

// Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Handle Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && await user.comparePassword(password)) {
        req.session.userId = user._id;
        res.redirect('/');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
