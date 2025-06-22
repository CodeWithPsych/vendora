import connectToDatabase from "@/lib/dbConnect";
import Product from "@/models/deletedProduct";

export const getAllDeletedProducts = async (req, res) => {
  try {
    await connectToDatabase();
    
    const deletedProducts = await Product.find({ isDeleted: true });
    res.json(deletedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
