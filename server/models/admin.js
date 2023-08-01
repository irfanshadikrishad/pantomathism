require('dotenv').config();
const { sign } = require('jsonwebtoken');
const { Schema, model } = require('mongoose');
const chalk = require('chalk');

const resolve = chalk.hex('#ACFADF');
const reject = chalk.hex('#FF6666');

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true });

adminSchema.methods.genJWT = async function () {
    try {
        let token = await sign({
            _id: this._id
        }, process.env.JWT_TOKEN);
        this.tokens = this.tokens.concat({ token: token });
        this.save().then(data => {
            console.log(resolve(`[ok] token generated successfully.`));
        }).catch(err => {
            console.log(reject(`[!ok] failed generating token`));
        })
        return token;
    } catch (error) {
        console.log(reject(`[!ok] genJWT failure ${error}`));
    }
}

const Admin = new model('Admin', adminSchema);

module.exports = Admin;