import mongoose, { Schema, ObjectId } from "mongoose";
import isEmail from "validator/lib/isEmail";

export default mongoose.model("Student", 
    new Schema({
        id: { type: ObjectId },
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
        phone: {
            type: String,
            required: true,
            validate: {
                validator: (phoneNumber) => phoneNumber.length > 8,
                message: "Phone number must be at least 8 characters"
            }
        },
        address: { 
            type: String,
            required: true
        }
    })
) 