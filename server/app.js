require('dotenv').config();
const chalk = require('chalk');
const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const MONGO = process.env.MONGO;
const resolve = chalk.hex('#ACFADF');
const reject = chalk.hex('#FF6666');

mongoose.connect(MONGO).then(() => {
    console.log(resolve(`[connected to database]`));
}).catch(err => {
    console.log(reject(`[database connection failed] : ${err}`));
})

const app = express();

module.exports = { resolve, reject };

app.listen(PORT, () => {
    console.log(resolve(`[listening] ${PORT}`));
})