import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import Order from "@/models/order";

export async function GET(request, { params }) {
  try {
    await connectToDatabase();

    const { id } = params;
    const order = await Order.findById(id).populate("user");

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (err) {
    console.error("Error fetching order:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
