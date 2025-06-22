import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import DeletedProduct from "@/models/deletedProduct";

export async function GET() {
  try {
    await connectToDatabase();
    const deletedProducts = await DeletedProduct.find();
    return NextResponse.json(deletedProducts);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
