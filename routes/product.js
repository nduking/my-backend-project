const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProductById,
} = require("../controllers/productController");
const auth = require("../middleware/auth");

const router = express.Router();
  
// public
router.get("/get-all-products", getAllProducts);
router.post("/create", auth, createProduct);

router.get("/:id", getProductById);

module.exports = router;