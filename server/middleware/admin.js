import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
import chalk from "chalk";

dotenv.config();
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
        console.log(reject(`[error] Authorization Failed : ${error} :admin-middleware-30`));
        res.status(401).json({ message: `Authorization Failed : ${error}` });
    }
}

export default admin;