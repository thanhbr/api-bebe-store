import mongoose, { Schema } from "mongoose";
import { MESSAGE } from "../global/message.js";

export default mongoose.model("Promotion",
    new Schema({
        code: { 
            type: String, 
            required: true,
            unique: true,
            validate: {
                validator: (code) => code.length >= 3,
                message: `Promotion code ${MESSAGE.MIN_LENGTH}`
            }
        },
        name: {
            type: String,
            required: true,
            validate: {
                validator: (name) => name.length >= 3,
                message: `Promotion name ${MESSAGE.MIN_LENGTH}`
            }
        },
        discountType: {
            type: String,
            enum: {
                values: ["percent", "amount"],
                message: "{VALUE} is not supported"
            },
            required: true
        },
        discountValue: {
            type: Number,
            required: true,
            validate: {
                validator: (discountValue) => discountValue > 0,
                message: "Discount value must be greater than 0"
            }
        },
        isActive: {
            type: Boolean,
            default: true
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    }, { timestamps: true })
)