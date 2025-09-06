const Product = require("../models/product.models");
const mongoose = require("mongoose");
const { search } = require("../routes/auth");
const productModels = require("../models/product.models")

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

    // filter object
    const filter = { isActive: true };

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$gte = Number(maxPrice);
    }
    if (inStock === "true") {
      filter.inStock = true;
      filter.stockQuantity = { $gt: 0 };
    }

    if (search) {
      filter.$text = { $search: search };
    }
    //pagination
    const skip = (Number(page) - 1) * Number(limit);
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Execute query
    const products = await Product.find(filter)
      .populate("createdBy", "name email")
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      data: products,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalProducts: total,
        hasPrevPage: Number(page) > 1,
      },
    });

    res.json({
      success: true,
      data: product,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalProducts: total,
        hasPrevPage: Number(page) > 1,
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
    await newProduct.save();

    await newProduct.populate("createdBy", "name email");

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      data: newProduct,
    });
  } catch (error) {
    console.log(error.message);
    if (error.code === 11000) {
      return;
      res.status(400).json({
        success: false,
        message: "Product with this sku already exist",
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
