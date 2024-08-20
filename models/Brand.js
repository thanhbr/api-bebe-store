import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model("Brand", 
    new Schema({
        id: { type: ObjectId },
        code: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (code) => code.length > 3,
                message: "Brand code must be at least 4 characters. Eg: C001"
            }
        },
        name: {
            type: String,
            required: true,
            validate: {
                validator: (name) => name.length > 3,
                message: "Brand name must be at least 4 characters. Eg: C001"
            }
        },
        urlKey: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (urlKey) => urlKey.length > 3,
                message: "Brand url key must be at least 4 characters. Eg: C001"
            }
        },
        logo: {
            type: String,
            required: true,
            validate: {
                validator: (logo) => logo.length > 3,
                message: "Brand logo must be at least 4 characters. Eg: C001"
            }
        }
    }, { timestamps: true } )
)