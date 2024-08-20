import mongoose, { Schema, ObjectId } from "mongoose";

export default mongoose.model("Klass", 
    new Schema({
        id: { type: ObjectId },
        code: {
            type: String,
            required: true,
            validate: {
                validator: (code) => code.length > 3,
                message: "Class's code must be at least 4 characters. Eg: C001"
            }
        },
        name: {
            type: String,
            required: true,
            validate: {
                validator: (name) => name.length > 3,
                message: "Class's name must be at least 4 characters. Eg: Class 1"
            }
        }
    })
)