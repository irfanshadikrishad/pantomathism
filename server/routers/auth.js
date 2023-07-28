const express = require('express');
const { hash } = require('bcrypt');
const router = express.Router();
const User = require('../models/user');

const SALT = Number(process.env.SALT);

router.post('/registration', async (req, res) => {
    const { name, email, password } = await req.body;
    User.findOne({ email: email }).then(data => {
        if (data) {
            res.status(400).json({ message: "User already exists" });
        } else {
            hash(password, SALT, function (error, hash) {
                if (error) {
                    console.log(`[!ok] ${error}`);
                    res.status(400).json({ message: "Salting Error" });
                } else {
                    const user = new User({
                        name: name,
                        email: email,
                        password: hash
                    });
                    user.save().then(data => {
                        res.status(201).json({ message: "Registration Successfull!" })
                    }).catch(err => {
                        res.status(400).json({ message: `Registration Save failed ${err}` })
                    })
                }
            })
        }
    })
})

router.post('/login', (req, res) => {
})

module.exports = router;