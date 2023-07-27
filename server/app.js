require('dotenv').config();
const chalk = require('chalk');
const cors = require('cors');
const express = require('express');
const { connect } = require('mongoose');
const auth = require('./routers/auth');

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
    origin: "http://localhost:3000"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(auth);

module.exports = { resolve, reject };

app.listen(PORT, () => {
    console.log(resolve(`[ok] ${PORT}`));
})