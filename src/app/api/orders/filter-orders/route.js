import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import Order from "@/models/order";

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const _page = parseInt(searchParams.get("_page")) || 1;
    const _per_page = parseInt(searchParams.get("_per_page")) || 10;

    let query = Order.find({});
    let totalQuery = Order.find({});

    // Filter by status
    if (status) {
      query = query.where("status").equals(status);
      totalQuery = totalQuery.where("status").equals(status);
    }

    // Pagination
    query = query.skip(_per_page * (_page - 1)).limit(_per_page);

    // Total orders
    const totalOrders = await totalQuery.countDocuments().exec();
    const OrderedItems = await query.exec();

    const response = NextResponse.json({ OrderedItems }, { status: 200 });
    response.headers.set("totalOrders", totalOrders.toString());

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
