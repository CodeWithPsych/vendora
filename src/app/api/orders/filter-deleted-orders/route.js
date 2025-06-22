import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import DeletedOrder from "@/models/deletedOrder";

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);

    let query = DeletedOrder.find({});
    let totalQuery = DeletedOrder.find({});

    // Pagination
    const page = parseInt(searchParams.get("_page")) || 1;
    const perPage = parseInt(searchParams.get("_per_page")) || 10;

    query = query.skip(perPage * (page - 1)).limit(perPage);

    const totalOrders = await totalQuery.countDocuments().exec();
    const OrderedItems = await query.exec();

    return NextResponse.json(
      { OrderedItems },
      {
        status: 200,
        headers: {
          totalDeletedOrders: totalOrders.toString(),
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
