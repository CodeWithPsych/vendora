
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Brand from "@/models/brand";

export async function GET() {
  try {
    await dbConnect();
    const brands = await Brand.find();
    return NextResponse.json({ brands }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch brands" }, { status: 500 });
  }
}