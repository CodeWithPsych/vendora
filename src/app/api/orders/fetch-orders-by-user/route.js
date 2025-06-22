import Order from "@/models/order";
import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "User id is required" }, { status: 400 });
    }

    const orders = await Order.find({ user: id });

    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message || err }, { status: 400 });
  }
}
