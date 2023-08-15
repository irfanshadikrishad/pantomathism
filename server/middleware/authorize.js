import dotenv from "dotenv";
import pkg from "jsonwebtoken";
import User from "../models/user.js";
import chalk from "chalk";

const JWT_TOKEN = process.env.JWT_TOKEN;
const resolve = chalk.hex('#ACFADF');
const reject = chalk.hex('#FF6666');

const authorize = async (req, res, next) => {
    try {
        const token = await req.cookies.JWT; // getting token from cookies
        const verify = await pkg.verify(token, JWT_TOKEN); // returns payload id

        const rootUser = await User.findOne({ _id: verify._id, "tokens.token": token });

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

export default authorize;