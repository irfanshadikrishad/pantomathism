import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";
import express from "express";
import { connect } from "mongoose";
import auth from "./routers/auth.js";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.PORT || 3001;
const MONGO = process.env.MONGO;
const resolve = chalk.hex('#ACFADF');
const reject = chalk.hex('#FF6666');

connect(MONGO).then(() => {
    console.log(resolve(`[ok] database connection`));
}).catch(err => {
    console.log(reject(`[!ok] database connection : ${err}`));
})

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "https://pantomathism.netlify.app"
}))
app.use(auth);

app.listen(PORT, () => {
    console.log(resolve(`[ok] ${PORT}`));
})