import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import Product from "@/models/products";
import Cloudinary from "@/lib/utils/cloudinary";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false, 
  },
};

export async function PATCH(request, { params }) {
  try {
    await connectToDatabase();

    const form = formidable({ multiples: true });
    const data = await new Promise((resolve, reject) => {
      form.parse(request, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const { fields, files } = data;
    const productId = params.id;

    let productItem = await Product.findById(productId);
    if (!productItem) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const updates = { ...fields };

    if (files.file) {
      const fileArray = Array.isArray(files.file) ? files.file : [files.file];
      try {
        const uploadedImages = await Promise.all(
          fileArray.map(async (file) => {
            const result = await Cloudinary.uploader.upload(file.filepath);
            return result.url;
          })
        );

        updates.thumbnail = uploadedImages[0] || productItem.thumbnail;
        updates.images = [
          ...uploadedImages.slice(1, 4),
          ...productItem.images.slice(uploadedImages.length - 1),
        ];
      } catch (error) {
        return NextResponse.json(
          { error: "Failed to upload images" },
          { status: 500 }
        );
      }
    }

    productItem = await Product.findByIdAndUpdate(productId, updates, {
      new: true,
    });

    return NextResponse.json(productItem, { status: 200 });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
