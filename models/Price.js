import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "Price",
  new Schema(
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      price: {
        type: Number,
        required: true,
        validate: {
          validator: (price) => price > 0,
          message: "Price must be greater than 0",
        },
      },
      wholeSalePrice: {
        type: Number,
        required: true,
        validate: {
          validator: (wholeSalePrice) => wholeSalePrice > 0,
          message: "Whole sale price must be greater than 0",
        },
      },
      retailPrice: {
        type: Number,
        required: true,
        validate: {
          validator: (retailPrice) => retailPrice > 0,
          message: "Retail price must be greater than 0",
        },
      },
      promotionPrice: {
        type: Number,
        required: true,
        validate: {
          validator: (promotionPrice) => promotionPrice > 0,
          message: "Promotion price must be greater than 0",
        },
      },
      importPrice: {
        type: Number,
        required: true,
        validate: {
          validator: (importPrice) => importPrice > 0,
          message: "Import price must be greater than 0",
        },
      },
      currency: {
        type: String,
        required: true,
      },
    },
    { timestamps: true },
  ),
);
