import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import Order from "@/models/order";

export async function PATCH(request, { params }) {
  try {
    await connectToDatabase();

    const { id } = params;
    const body = await request.json();

    const updatedOrder = await Order.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (err) {
    console.error("Error updating order:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
