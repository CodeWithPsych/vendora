import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Category from "@/models/category";

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const category = new Category(body);
    const savedCategory = await category.save();

    return NextResponse.json(savedCategory, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json({ error: "Category already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
