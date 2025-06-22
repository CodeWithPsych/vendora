import mongoose, { Schema, model, models } from "mongoose";

const DeletedProductSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      min: [0, "Wrong Minimum Rating"],
      max: [5, "Wrong Maximum Rating"],
      default: 0,
    },
    price: {
      type: Number,
      min: [1, "Wrong Minimum Price"],
      required: true,
    },
    discountPercentage: {
      type: Number,
      min: [1, "Wrong Minimum discountPercentage"],
      max: [99, "Wrong Maximum discountPercentage"],
      default: 0,
    },
    stock: {
      type: Number,
      min: [0, "Wrong Minimum stock"],
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(_, ret) {
        delete ret._id;
      },
    },
  }
);

// Virtual field `id` to replace MongoDB's `_id`
DeletedProductSchema.virtual("id").get(function () {
  return this._id;
});

const DeletedProduct = models?.DeletedProduct || model("DeletedProduct", DeletedProductSchema);

export default DeletedProduct;
