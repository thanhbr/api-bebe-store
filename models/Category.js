import mongoose, { Schema } from "mongoose";
import { MESSAGE } from "../global/message.js";

export default mongoose.model(
  "Category",
  new Schema(
    {
      parentId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        default: null,
      },
      name: {
        type: String,
        required: true,
        validate: {
          validator: (name) => name.length > 3,
          message: `Category name ${MESSAGE.MIN_LENGTH}`,
        },
      },
      urlKey: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: (urlKey) => urlKey.length >= 3,
          message: `Category url key ${MESSAGE.MIN_LENGTH}`,
        },
      },
      isActive: {
        type: Boolean,
        default: true,
      },
      level: {
        type: Number,
        required: true,
      },
      isChild: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true },
  ),
);
