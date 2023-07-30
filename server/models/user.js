require('dotenv').config();
const { sign } = require('jsonwebtoken');
const { Schema, model } = require('mongoose');
const chalk = require('chalk');

const resolve = chalk.hex('#ACFADF');
const reject = chalk.hex('#FF6666');

const userSchema = new Schema({
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
    blog: [{
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        categories: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true });


userSchema.methods.genJWT = async function () {
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

userSchema.methods.addBlog = async function (name, email, categories, title, description) {
    try {
        this.blog = await this.blog.concat({ name, email, categories, title, description });
        await this.save().then(data => {
            console.log(resolve(`[ok] blog saved`));
        }).catch(err => {
            console.log(reject(`[!ok] blog save failed ${err}`));
        })
    } catch (error) {
        console.log(reject(`[!ok] addBlog failed`));
    }
    return this.blog;
}

const User = model('User', userSchema);

module.exports = User;