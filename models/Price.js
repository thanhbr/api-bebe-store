import mongoose, { Schema } from "mongoose";

export default mongoose.model("Price",
    new Schema({
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        wholeSalePrice: {
            type: Number,
            required: true,
        },
        retailPrice: {
            type: Number,
            required: true,
        },
        promotionPrice: {
            type: Number,
            required: true,
        },
        importPrice: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
    }, { timestamps: true })
)