const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: function () {
        return this.price;
      },
    },
    category: {
      type: String,
      required: true,
      enum: [
        "chairs",
        "table",
        "sofas",
        "beds",
        "storage",
        "lighting",
        "decor",
      ],
    },
    collections: {
      type: String,
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
          default: "",
        },
      },
    ],
    inStock: {
      type: Boolean,
      default: true,
    },
    stockQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    features: [
      {
        type: String,
        trim: true,
      },
    ],
    dimensions: {
      height: Number,
      width: Number,
      depth: Number,
      unit: {
        type: String,
        default: "inches",
        enum: ["inches", "cm", "feet"],
      },
    },
    weight: {
      value: Number,
      Unit: {
        type: String,
        default: "lbs",
        enum: ["lbs", "kg"],
      },
    },
    materials: [
      {
        type: String,
        trim: true,
      },
    ],
    careInstructions: {
      type: String,
      maxlength: 1000,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text" });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ "rating.average": -1 });

module.exports = mongoose.model("Product", productSchema);
