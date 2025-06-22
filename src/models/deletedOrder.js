import mongoose, { Schema, models, model } from "mongoose";

const deletedOrderSchema = new Schema(
  {
    items: { type: [Schema.Types.Mixed], required: true },
    totalAmount: { type: Number },
    totalItems: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, default: "pending" },
    selectedAddress: { type: [Schema.Types.Mixed], required: true },
    date: { type: String },
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

// Add virtual `id` field
deletedOrderSchema.virtual("id").get(function () {
  return this._id;
});

const DeletedOrder = models?.DeletedOrder || model("DeletedOrder", deletedOrderSchema);
export default DeletedOrder;
