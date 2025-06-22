import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import Product from "@/models/products";

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find();
    const totalItems = products.length;

    return NextResponse.json(
      {
        products,
        totalItems,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
