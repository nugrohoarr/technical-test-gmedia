const Category = require("../model/categories.model");

const addCategory = async (req, res) => {
  try {
    const { category_name } = req.body;

    const newCategory = await Category.query().insert({
      category_name,
    });

    res.status(201).json({
      message: "Added category successfully!",
      data: {
        id :newCategory.id,
        newCategory: category_name,
        created_at: newCategory.created_at,
        updated_at: newCategory.updated_at,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Added category failed, please try again!",
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.query().select("*");
    
    res.status(200).json({
      message: "OK!",
      data: categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  addCategory,
  getCategories,
};
