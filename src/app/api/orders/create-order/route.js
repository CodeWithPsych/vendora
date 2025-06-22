import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import Order from "@/models/order";

export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const userId = body.userId; 
    if (!userId) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }
    const order = new Order({ ...body, user: userId });
    const newOrder = await order.save();
    return NextResponse.json(newOrder, { status: 201 });
  } catch (err) {
    console.error("Error creating order:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}