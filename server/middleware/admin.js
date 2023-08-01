require('dotenv').config();
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const chalk = require('chalk');


const JWT_TOKEN = process.env.JWT_TOKEN;
const resolve = chalk.hex('#ACFADF');
const reject = chalk.hex('#FF6666');

const admin = async (req, res, next) => {
    try {
        const token = await req.cookies.JWT; // getting token from cookies
        const verify = await jwt.verify(token, JWT_TOKEN); // returns payload id

        const rootUser = await Admin.findOne({ _id: verify._id, "tokens.token": token });

        if (!rootUser) {
            throw new Error("User not found");
        }

        req.rootUser = rootUser;
        req.token = token;
        req.userID = rootUser._id;

        console.log(resolve(`[ok] authorization success`));
        next();

    } catch (error) {
        console.log(reject(`[!ok] Authorization Failed : ${error}`));
        res.status(401).json({ message: `Authorization Failed : ${error}` });
    }
}

module.exports = admin;