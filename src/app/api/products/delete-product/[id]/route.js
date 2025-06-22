import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import Product from "@/models/deletedProduct";

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();

    const { id } = params;
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    await Product.findByIdAndDelete(id);
    return NextResponse.json(
      { success: "Product has been deleted", product },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
