const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/registration', async (req, res) => {
    const { name, email, password } = await req.body;
    User.findOne({ email: email }).then(data => {
        if (data) {
            res.status(400).json({ message: "User already exists" });
        } else {
            const user = new User({
                name, email, password
            });
            user.save().then(data => {
                res.status(201).json({ message: "Registration Successfull!" })
            }).catch(err => {
                res.status(400).json({ message: `Registration Save failed ${err}` })
            })
        }
    })
})

router.post('/login', (req, res) => {
})

module.exports = router;