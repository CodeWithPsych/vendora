import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import DeletedOrder from "@/models/deletedOrder";

export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const deletedOrder = new DeletedOrder(body);
    const doc = await deletedOrder.save();

    return NextResponse.json(doc, { status: 201 });
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
}
