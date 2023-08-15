import dotenv from "dotenv";
import pkg from "jsonwebtoken";
import { Schema, model } from "mongoose";
import chalk from "chalk";

const { sign } = pkg;
const resolve = chalk.hex('#ACFADF');
const reject = chalk.hex('#FF6666');
dotenv.config();

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

export default Admin;