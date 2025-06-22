import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
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

// Add virtual `id`
CategorySchema.virtual("id").get(function () {
  return this._id;
});

const Category = models?.Category || model("Category", CategorySchema);

export default Category;
