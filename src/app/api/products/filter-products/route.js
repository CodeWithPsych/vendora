import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import Product from "@/models/products";

export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);

    let query = Product.find({});
    let totalQuery = Product.find({});

    // Filter by category
    if (searchParams.has("category")) {
      const category = searchParams.get("category");
      query = query.where({ category });
      totalQuery = totalQuery.where({ category });
    }

    // Filter by brand
    if (searchParams.has("brand")) {
      const brand = searchParams.get("brand");
      query = query.where({ brand });
      totalQuery = totalQuery.where({ brand });
    }

    // Sorting
    if (searchParams.has("_sort") && searchParams.has("_order")) {
      const sortField = searchParams.get("_sort");
      const sortOrder = searchParams.get("_order") === "asc" ? 1 : -1;
      query = query.sort({ [sortField]: sortOrder });
    }

    // Pagination
    if (searchParams.has("_page") && searchParams.has("_per_page")) {
      const pageSize = parseInt(searchParams.get("_per_page"));
      const page = parseInt(searchParams.get("_page"));
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }

    // Execute total count query and the paginated query
    const totalItems = await totalQuery.countDocuments().exec();
    const products = await query.exec();

    return NextResponse.json(
      {
        products,
        totalItems,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
