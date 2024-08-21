import mongoose, { Schema } from "mongoose";
import { MESSAGE } from "../global/message.js";

export default mongoose.model("Product", 
    new Schema({
        brandId: {
            type: Schema.Types.ObjectId,
            ref: 'Brand',
            required: true,
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        }, 
        promotionId: {
            type: Schema.Types.ObjectId,
            ref: 'Promotion',
        },
        sku: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (sku) => sku.length >= 3,
                message: `Product sku  ${MESSAGE.MIN_LENGTH}`
            }
        },
        name: {
            type: String,
            required: true,
        },
        urlKey: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        flavor: {
            type: String,
            required: true,
        },
        volume: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        },
        nutritionInfo: {
            type: String,
            required: true,
        },
        expiryDate: {
            type: Date,
        },
        isActive: {
            type: Boolean,
            default: true,
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
      }, { timestamps: true }
    )
)