import mongoose, { Schema } from "mongoose";
import { MESSAGE } from "../global/message.js";

export default mongoose.model("Brand", 
    new Schema({
        code: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (code) => code.length >= 3,
                message: `Brand code ${MESSAGE.MIN_LENGTH}`
            }
        },
        name: {
            type: String,
            required: true,
            validate: {
                validator: (name) => name.length >= 3,
                message: `Brand name ${MESSAGE.MIN_LENGTH}`
            }
        },
        urlKey: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (urlKey) => urlKey.length >= 3,
                message: `Brand url ${MESSAGE.MIN_LENGTH}`
            }
        },
        logo: {
            type: String,
            required: true,
            validate: {
                validator: (logo) => logo.length >= 3,
                message: `Brand logo ${MESSAGE.MIN_LENGTH}`
            }
        }
    }, { timestamps: true } )
)