const Product = require("../model/product.model");

const addProduct = async (req, res) => {
    try {
      const { product_name, price, category_id } = req.body;
      const image = req.file ? req.file.path : null;
  
      // Validasi input
      if (!product_name || !price || !category_id) {
        return res.status(400).json({
          message: "Product name, price, and category_id are required!",
        });
      }
  
      const newProduct = await Product.query().insert({
        images: image,
        product_name,
        price: parseFloat(price),
        category_id: parseInt(category_id, 10),
      });
  
      res.status(201).json({
        message: "Added product successfully!",
        data: newProduct,
      });
    } catch (error) {
      console.error(error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          message: "Validation Error",
          errors: error.data
        });
      }
      res.status(500).json({
        message: "Internal Server Error!",
      });
    }
  };

// Mengambil semua produk
const getProducts = async (req, res) => {
  try {
    const products = await Product.query().select("*");

    res.status(200).json({
      message: "OK!",
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
};
