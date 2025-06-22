import mongoose, { Schema, model, models } from "mongoose";

const BrandSchema = new Schema(
  {
    value: { type: String },
    label: { type: String },
    checked: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(_, ret) {
        delete ret._id;
      },
    },
  }
);

// Add virtual `id` field
BrandSchema.virtual("id").get(function () {
  return this._id;
});

const Brand = models?.Brand || model("Brand", BrandSchema);

export default Brand;
