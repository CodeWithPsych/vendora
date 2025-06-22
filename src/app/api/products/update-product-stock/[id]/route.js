import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import Product from "@/models/products";

export async function PATCH(request, { params }) {
  try {
    await connectToDatabase();

    const productId = params.id;
    const update = await request.json();

    let productStock = await Product.findById(productId);

    if (productStock) {
      productStock = await Product.findByIdAndUpdate(productId, update, {
        new: true,
      });
      return NextResponse.json(productStock, { status: 200 });
    } else {
      return NextResponse.json("Product not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
