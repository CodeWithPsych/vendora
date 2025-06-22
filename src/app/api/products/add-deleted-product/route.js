import Product from "@/models/products";
import connectToDatabase from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();

    const deletedProduct = new Product(body);
    const savedProduct = await deletedProduct.save();

    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    console.error("Internal Server Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
