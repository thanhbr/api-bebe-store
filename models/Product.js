import mongoose, { Schema } from "mongoose";
import { MESSAGE } from "../global/message.js";

export default mongoose.model(
  "Product",
  new Schema(
    {
      brandId: {
        type: Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
      },
      categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
      promotionId: {
        type: Schema.Types.ObjectId,
        ref: "Promotion",
      },
      sku: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: (sku) => sku.length >= 3,
          message: `Product sku ${MESSAGE.MIN_LENGTH}`,
        },
      },
      name: {
        type: String,
        required: true,
        validate: {
          validator: (name) => name.length >= 3,
          message: `Product name ${MESSAGE.MIN_LENGTH}`,
        },
      },
      urlKey: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: (urlKey) => urlKey.length >= 3,
          message: `Product url key ${MESSAGE.MIN_LENGTH}`,
        },
      },
      description: {
        type: String,
        required: true,
        validate: {
          validator: (description) => description.length >= 3,
          message: `Product description ${MESSAGE.MIN_LENGTH}`,
        },
      },
      flavor: {
        type: String,
        required: true,
        validate: {
          validator: (flavor) => flavor.length >= 3,
          message: `Product flavor ${MESSAGE.MIN_LENGTH}`,
        },
      },
      volume: {
        type: Number,
        required: true,
        validate: {
          validator: (volume) => volume > 0,
          message: "Product volume must be greater than 0",
        },
      },
      unit: {
        type: String,
        required: true,
      },
      nutritionInfo: {
        type: String,
        required: true,
        validate: {
          validator: (nutritionInfo) => nutritionInfo.length >= 3,
          message: `Product nutrition info ${MESSAGE.MIN_LENGTH}`,
        },
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
        ref: "User",
        required: true,
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    { timestamps: true },
  ),
);
