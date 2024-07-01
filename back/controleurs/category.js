const Category = require('../models/category');

exports.postCategory = async (req, res) => {
  try {
    // Check if the category already exists
    const existingCategory = await Category.findOne({ category: req.body.category });

    if (existingCategory) {
      return res.status(409).json({ message: "Category already exists" });
    }

    // Create a new category
    const cate = new Category({
      category: req.body.category,
    });

    const savedCate = await cate.save();
    res.status(201).json({ message: "Category created successfully", category: savedCate });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Category creation failed" });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete category', error: err.message });
  }
};

