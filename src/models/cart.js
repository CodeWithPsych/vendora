import mongoose,{ Schema } from "mongoose";

const CartSchema = new Schema({
  quantity: { type: Number, required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  size: { type: Schema.Types.Mixed },
  color: { type: Schema.Types.Mixed },
});

CartSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

CartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  },
});

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);

export default Cart;
