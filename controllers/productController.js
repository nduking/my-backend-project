const Product = require("../models/product.models");
const mongoose = require("mongoose");
<<<<<<< HEAD
// const { search } = require("../routes/auth");
=======
const { search } = require("../routes/auth");
const productModels = require("../models/product.models")
>>>>>>> f53bffadf5b3ecbe7365cb934fe2c27a70ae7656

const getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      minPrice,
      maxPrice,
      inStock,
      sortBy = "createdAt",
      sortOrder = "desc",
      search,
    } = req.query;

    const filter = { isActive: true };

    if (category) filter.category = category;

    if (minPrice || maxPrice) {
      const priceFilter = {};
      // filter.price = {};
      if (minPrice) filter.price.$gte = parseInt(minPrice);
      if (maxPrice) filter.price.$lte = parseInt(maxPrice);
      if (Object.keys(priceFilter).length) filter.price = priceFilter;
    }

    if (inStock === "true") {
      filter.inStock = true;
      filter.stockQuantity = { $gt: 0 };
    }

    if (search) {
      filter.$text = { $search: search }; // Ensure text index exists
      // Or use regex fallback:
      // filter.name = { $regex: search, $options: "i" };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

    const products = await Product.find(filter)
      .populate("createdBy", "name email")
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      data: products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalProducts: total,
        hasPrevPage: parseInt(page) > 1,
      },
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Error Fetching Products" });
  }
};

const createProduct = async (req, res) => {
  try {
    const productData = { ...req.body, createdBy: req.user.userId };

    const newProduct = new Product(productData);

    await newProduct.populate("createdBy", "name email");
    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      data: newProduct,
    });
  } catch (error) {
    console.log(error.message);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Product with this SKU already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error Creating Product",
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Product ID" });
    }

    const product = await Product.findById(id).populate(
      "createdBy",
      "name email"
    );

    if (!product || !product.isActive) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }

    res.status(200).json({
      success: true,
      message: "Product Found",
      data: product,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Error Fetching Product",
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
};
