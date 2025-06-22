import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import DeletedProduct from "@/models/deletedProduct";

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);

    let query = DeletedProduct.find({});
    let totalQuery = DeletedProduct.find({});

    // Filter by category
    const category = searchParams.get("category");
    if (category) {
      query = query.where({ category });
      totalQuery = totalQuery.where({ category });
    }

    // Filter by brand
    const brand = searchParams.get("brand");
    if (brand) {
      query = query.where({ brand });
      totalQuery = totalQuery.where({ brand });
    }

    // Pagination
    const pageSize = parseInt(searchParams.get("_per_page")) || 10;
    const page = parseInt(searchParams.get("_page")) || 1;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);

    // Execute queries
    const totaldeletedItems = await totalQuery.countDocuments().exec();
    const deletedproducts = await query.exec();

    return NextResponse.json(
      { deletedproducts },
      {
        status: 200,
        headers: {
          totaldeletedItems: totaldeletedItems.toString(),
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
