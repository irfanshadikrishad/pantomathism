require('dotenv').config();
const chalk = require('chalk');
const cors = require('cors');
const express = require('express');
const { connect } = require('mongoose');
const auth = require('./routers/auth');
const cookieParser = require('cookie-parser');

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
app.use(cors({
    credentials: true,
    origin: "https://jade-licorice-c9f72d.netlify.app"
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(auth);

app.listen(PORT, () => {
    console.log(resolve(`[ok] ${PORT}`));
})