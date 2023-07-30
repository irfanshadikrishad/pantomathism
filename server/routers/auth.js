const express = require('express');
const { hash, compare } = require('bcrypt');
const chalk = require('chalk');
const router = express.Router();
const User = require('../models/user');
const authorize = require('../middleware/authorize');

const SALT = Number(process.env.SALT);
const resolve = chalk.hex('#ACFADF');
const reject = chalk.hex('#FF6666');

router.post('/registration', async (req, res) => {
    const { name, email, password } = await req.body;
    User.findOne({ email: email }).then(data => {
        if (data) {
            res.status(400).json({ message: "User already exists" });
        } else {
            hash(password, SALT, function (error, hash) {
                if (error) {
                    console.log(reject(`[!ok] ${error}`));
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

router.post('/login', async (req, res) => {
    const { email, password } = await req.body;
    User.findOne({ email: email }).then(data => {
        if (!data) {
            res.status(400).json({ message: "Invalid Credentials!" });
        } else {
            compare(password, data.password, function (error, result) {
                if (error) {
                    res.status(400).json({ message: "Decrypt Error" });
                } else {
                    if (email === data.email && result) {
                        data.genJWT().then(token => {
                            console.log(resolve(`[ok] JWT : ${token}`));
                            res.status(200).cookie(
                                "JWT", token, {
                                expires: new Date(Date.now() + 25892000000),
                                httpOnly: true
                            }).json({ message: "Logged In" });
                        }).catch(err => {
                            console.log(reject(`[!ok] JWT Failed`));
                        })
                    } else {
                        res.status(400).json({ message: "Invalid Credentials!" })
                    }
                }
            })
        }
    })
})

router.get('/profile', authorize, (req, res) => {
    console.log(resolve(`[ok] rootUser (${req.rootUser._id})`));
    res.json(req.rootUser);
})

router.get('/data', authorize, (req, res) => {
    res.json(req.rootUser);
})

router.get('/logout', (req, res) => {
    console.log(resolve(`[ok] logged out`));
    res.clearCookie("JWT", { path: "/" });
    res.status(200).json({ message: "Logged Out Successfully." });
})

router.post('/create', authorize, async (req, res) => {
    const { name, email, categories, title, description } = await req.body;
    if (name !== "" || email !== "" || categories !== "" || title !== "" || description !== "") {
        const ID = req.userID;
        const user = await User.findOne({ _id: ID });
        if (user) {
            const userBlog = await user.addBlog(name, email, categories, title, description);
            await user.save().then(data => {
                console.log(resolve(`[ok] blog saved - 92`));
                res.status(200).json({ message: "Posted" });
            }).catch(err => {
                console.log(reject(`[!ok] blog failed 92 ${err}`));
            })
        } else {
            res.status(404).json({ message: "Invalid Fields!" });
        }
    } else {
        res.status(422).json({ message: "Please fill the form properly." })
    }
})

module.exports = router;