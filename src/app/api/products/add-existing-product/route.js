import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import Product from "@/models/products";

export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const product = new Product(body);

    const savedProduct = await product.save();
    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    console.error("Internal Server Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
