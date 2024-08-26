import mongoose, { Schema } from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import Exception from "../exceptions/Exception.js";

export default mongoose.model("User",
    new Schema({
        name: { 
            type: String, 
            required: true,
            validate: {
                validator: (value) => value.length >= 5,
                message: Exception.USER_NAME_LEAST_5_CHARACTERS
            }
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: isEmail,
                message: Exception.USER_EMAIL_INCORRECT_FORMAT
            }
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: (password) => password.length >= 8,
                message: Exception.USER_PASS_LEAST_8_CHARACTERS
            }
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (phoneNumber) => phoneNumber.length > 8,
                message: Exception.USER_PHONE_LEAST_8_CHARACTERS
            }
        },
        address: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: {
                values: ["superAdmin", "manager", "admin", "staff", "customer"],
                message: "{VALUE} is not supported"
            },
            default: "customer"
        }
    }, { timestamps: true })
)