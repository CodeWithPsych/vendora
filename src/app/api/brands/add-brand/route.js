
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Brand from "@/models/brand";

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const brand = new Brand(body);
    const savedBrand = await brand.save();

    return NextResponse.json(savedBrand, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json({ error: "Brand already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}