import mongoose, { Schema } from "mongoose";
import isEmail from "validator/lib/isEmail.js";

export default mongoose.model("Student", 
    new Schema({
        name: { 
            type: String, 
            required: true,
            validate: {
                validator: (value) => value.length > 3,
                message: "User name must be at least 3 characters"
            }
        },
        email: {
            type: String,
            validate: {
                validator: isEmail,
                message: "Email is incorrect format"
            }
        },
        languages: {
            type: [String]
        },
        gender: {
            type: String,
            enum: {
                values: ["male", "female"],
                message: "{VALUE} is not supported"
            },
            required: true
        },
        phoneNumber: {
            type: String,
            required: true,
            validate: {
                validator: (phoneNumber) => phoneNumber.length > 8 && phoneNumber.length <= 20,
                message: "Phone number must be at least 8 characters, max: 20"
            }
        },
        address: { 
            type: String,
            required: true
        }
    })
) 