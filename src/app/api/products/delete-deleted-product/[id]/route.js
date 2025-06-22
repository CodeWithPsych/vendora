import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import DeletedProduct from "@/models/deletedProduct";

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();

    const { id } = params;

    const product = await DeletedProduct.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    const deletedProduct = await DeletedProduct.findByIdAndDelete(id);

    return NextResponse.json(
      { success: "Product has been deleted", product: deletedProduct },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
