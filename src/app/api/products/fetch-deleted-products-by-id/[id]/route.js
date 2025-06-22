import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import DeletedProduct from "@/models/deletedProduct";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();

    const { id } = params;
    const product = await DeletedProduct.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
