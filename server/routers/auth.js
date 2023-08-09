const express = require('express');
const { hash, compare } = require('bcrypt');
const chalk = require('chalk');
const router = express.Router();
const User = require('../models/user');
const Admin = require('../models/admin');
const authorize = require('../middleware/authorize');
const admin = require('../middleware/admin');
const _ = require('lodash');

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
                                httpOnly: false,
                                sameSite: 'none',
                                secure: true
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
    res.clearCookie("JWT", { path: "/", secure: true, sameSite: 'none' });
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
                res.status(400).json({ message: "Fill properly. [96]" });
            })
        } else {
            res.status(404).json({ message: "Invalid Fields!" });
        }
    } else {
        res.status(422).json({ message: "Please fill the form properly." })
    }
})

router.get('/getall', (req, res) => {
    User.find({}).sort({ createdAt: -1 }).then(data => {
        console.log(data);
        res.status(200).json(data);
    }).catch(err => {
        res.status(400).json(err)
    })
})
router.get('/get3', (req, res) => {
    User.find({}).sort({ updatedAt: -1 }).limit(1).then(data => {
        console.log(data);
        res.status(200).json(data);
    }).catch(err => {
        res.status(400).json(err)
    })
})

router.get('/blogs/:blogTitle', (req, res) => {
    console.log(resolve(`[ok] params : ${req.params.blogTitle}`));
    const desiredTitle = _.lowerCase(req.params.blogTitle);
    User.find({}).then(data => {
        data.map((e) => {
            const bloog = e.blog;
            bloog.map((blo) => {
                const blogOriginal = _.lowerCase(blo.title);
                if (desiredTitle == blogOriginal) {
                    res.status(200).json(blo);
                    return;
                }
            })
        })
        res.status(404).json({ message: "Not Found" });
    }).catch(err => {
        console.log(reject(`[!ok] blogs 131 ${err}`));
    })

})

router.get('/politics', (req, res) => {
    User.find({ "blog.categories": "politics" }).then(data => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: "No blogs available" });
        }
    }).catch(error => {
        console.log(reject(`[!ok] politics : ${error}`));
    })
})
router.get('/politics3', (req, res) => {
    User.find({ "blog.categories": "politics" }).limit(3).then(data => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: "No blogs available" });
        }
    }).catch(error => {
        console.log(reject(`[!ok] politics : ${error}`));
    })
})

router.get('/history', (req, res) => {
    User.find({ "blog.categories": "history" }).then(data => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: "No blogs available" });
        }
    }).catch(error => {
        console.log(reject(`[!ok] history : ${error}`));
    })
})
router.get('/history3', (req, res) => {
    User.find({ "blog.categories": "history" }).limit(3).then(data => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: "No blogs available" });
        }
    }).catch(error => {
        console.log(reject(`[!ok] history : ${error}`));
    })
})
router.get('/religion', (req, res) => {
    User.find({ "blog.categories": "religion" }).sort({ "blog.date": -1 }).then(data => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: "No blogs available" });
        }
    }).catch(error => {
        console.log(reject(`[!ok] religion : ${error}`));
    })
})
router.get('/religion3', (req, res) => {
    User.find({ "blog.categories": "religion" }).limit(3).sort({ "blog.date": -1 }).then(data => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: "No blogs available" });
        }
    }).catch(error => {
        console.log(reject(`[!ok] religion : ${error}`));
    })
})
router.get('/technology', (req, res) => {
    User.find({ "blog.categories": "technology" }).sort({ "blog.date": -1 }).then(data => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: "No blogs available" });
        }
    }).catch(error => {
        console.log(reject(`[!ok] technology : ${error}`));
    })
})
router.get('/technology3', (req, res) => {
    User.find({ "blog.categories": "technology" }).limit(3).sort({ "blog.date": -1 }).then(data => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: "No blogs available" });
        }
    }).catch(error => {
        console.log(reject(`[!ok] technology : ${error}`));
    })
})
router.get('/anime', (req, res) => {
    User.find({ "blog.categories": "anime" }).sort({ "blog.date": -1 }).then(data => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: "No blogs available" });
        }
    }).catch(error => {
        console.log(reject(`[!ok] anime : ${error}`));
    })
})
router.get('/anime3', (req, res) => {
    User.find({ "blog.categories": "anime" }).limit(3).sort({ "blog.date": -1 }).then(data => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: "No blogs available" });
        }
    }).catch(error => {
        console.log(reject(`[!ok] anime : ${error}`));
    })
})
router.get('/manga', (req, res) => {
    User.find({ "blog.categories": "manga" }).sort({ "blog.date": -1 }).then(data => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: "No blogs available" });
        }
    }).catch(error => {
        console.log(reject(`[!ok] manga : ${error}`));
    })
})
router.get('/manga3', (req, res) => {
    User.find({ "blog.categories": "manga" }).limit(3).sort({ "blog.date": -1 }).then(data => {
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({ message: "No blogs available" });
        }
    }).catch(error => {
        console.log(reject(`[!ok] manga : ${error}`));
    })
})

router.post('/panel', async (req, res) => {
    const { email, password } = await req.body;
    if (email === "" || password === "") {
        res.status(400).json({ message: "Can't be empty" });
    } else {
        Admin.findOne({ email: email }).then(user => {
            if (user) {
                compare(password, user.password, function (error, result) {
                    if (error) {
                        console.log(reject(`[!ok] decrypt error 195 : ${error}`));
                        res.status(422).json({ message: "Decrypt Error" });
                    } else {
                        if (email === user.email && result) {
                            user.genJWT().then(token => {
                                console.log(resolve(`[ok] JWT : ${token}`));
                                res.status(200).cookie(
                                    "JWT", token, {
                                    expires: new Date(Date.now() + 25892000000),
                                    httpOnly: false,
                                    sameSite: 'none',
                                    secure: true
                                }).json({ message: "Logged In" });
                            }).catch(err => {
                                console.log(reject(`[!ok] JWT Failed`));
                            })
                        } else {
                            res.status(400).json({ message: "Invalid Credentials! 210" })
                        }
                    }
                })
            } else {
                res.status(404).json({ message: "Invalid Credentials 215" });
            }
        }).catch(error => {
            res.status(404).json({ message: "Finding Error" })
        })
    }
})

router.post('/admin', (req, res) => {
    const { name, email, password } = req.body;
    if (name === "" || email === "" || password === "") {
        res.status(400).json({ message: "Can't be empty." })
    } else {
        Admin.findOne({ email: email }).then(data => {
            if (data) {
                res.status(400).json({ message: "User Already Exists" })
            } else {
                hash(password, SALT, function (error, hash) {
                    const admin = new Admin({
                        name: name,
                        email: email,
                        password: hash
                    })
                    admin.save().then(sav => {
                        res.status(201).json({ message: "Register Success" });
                    }).catch(error => {
                        res.status(400).json({ message: "Can't Register" });
                    })
                })
            }
        })
    }
})

router.get('/panel/admin', admin, (req, res) => {
    res.status(200).json(req.rootUser);
})

router.delete('/user/delete', admin, async (req, res) => {
    const { id } = await req.body;
    console.log(resolve(`[ok] delete  ${id}`));
    User.deleteOne({ _id: id }).then(data => {
        res.status(200).json({ message: "Deleted Successfully" })
    }).catch(error => {
        res.status(404).json({ message: error })
    })
})

router.patch('/blog/delete', async (req, res) => {
    const { blogId, userId } = await req.body;
    User.findByIdAndUpdate({ _id: userId }, { $pull: { blog: { _id: blogId } } }, { new: true }).then(
        data => {
            if (!data) {
                res.status(404).json({ error: "N't Found" });
            } else {
                res.status(200).json(data);
            }
        }
    ).catch(error => {
        console.log(chalk.yellow(`[failure] blog/delete : ${error.message}`));
        res.status(400).json({ error: error })
    })
})

router.get('/user/:userId', async (req, res) => {
    const { userId } = await req.params;
    console.log(userId);
    User.findOne({ _id: userId }).then(data => {
        if (!data) {
            res.status(404).json({ error: "404 Not Found" });
        } else {
            res.status(200).json(data);
        }
    }).catch(error => {
        console.log(chalk.yellow(`[failure] userId : ${error.message}`));
        res.status(404).json({ error: error });
    })
})

module.exports = router;