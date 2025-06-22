import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbConnect";
import Product from "@/models/products";
import Cloudinary from "@/lib/utils/cloudinary";
import formidable from "formidable";

export async function POST(req) {
  try {
    await connectToDatabase();

    const form = formidable({ multiples: true });
    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const { fields, files } = data;
    const fileArray = Array.isArray(files.file) ? files.file : [files.file];

    const uploadedImages = await Promise.all(
      fileArray.map(async (file) => {
        const result = await Cloudinary.uploader.upload(file.filepath);
        return result.url;
      })
    );

    const product = new Product({
      fields
  
    });

    const savedProduct = await product.save();
    return NextResponse.json(savedProduct, { status: 201 });
  } catch (error) {
    console.error("Internal Server Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Important for formidable to work
export const config = {
  api: {
    bodyParser: false,
  },
};
