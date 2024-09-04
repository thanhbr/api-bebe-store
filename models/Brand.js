import mongoose, { Schema } from "mongoose";
import { MESSAGE } from "../global/message.js";

export default mongoose.model(
  "Brand",
  new Schema(
    {
      code: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: (code) => code.length >= 3,
          message: `Brand code ${MESSAGE.MIN_LENGTH}`,
        },
      },
      name: {
        type: String,
        required: true,
        validate: {
          validator: (name) => name.length >= 3,
          message: `Brand name ${MESSAGE.MIN_LENGTH}`,
        },
      },
      urlKey: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: (urlKey) => urlKey.length >= 3,
          message: `Brand url ${MESSAGE.MIN_LENGTH}`,
        },
      },
      logo: {
        type: String,
        required: true,
        validate: [
          {
            validator: function(v) {
              return v.length >= 3;
            },
            message: 'Brand logo must be at least 3 characters'
          },
          {
            validator: function(v) {
              const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
              return urlPattern.test(v);
            },
            message: 'Brand logo must be a valid URL'
          }
        ]
      },
      isDeleted: {
        type: Boolean,
        default: false
      },
    },
    { timestamps: true },
  ),
);
