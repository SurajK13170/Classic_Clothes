const express = require("express");
const { ProductModel } = require("../model/Product.model");
const prodRoute = express.Router();

prodRoute.post("/add", async (req, res) => {
  try {
    const prod = new ProductModel(req.body);
    await prod.save();
    res.status(200).json({ msg: "Product added to DB!!" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// GET all products
prodRoute.get("/", async (req, res) => {
  try {
    let { search, category, sortBy } = req.query;
    let filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    if (category) {
      filter.category = category;
    }
    let sort = {};
    if (sortBy) {
      const sortFields = sortBy.split(",");
      for (let field of sortFields) {
        if (field.startsWith("-")) {
          sort[field.substring(1)] = -1;
        } else {
          sort[field] = 1;
        }
      }
    } else {
      sort.price = 1; // default sorting by price ascending
    }
    const products = await ProductModel.find(filter).sort(sort);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// GET a specific product by ID
prodRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById({ _id: id });
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

// PATCH (partial update) a product by ID
prodRoute.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById({ _id: id });
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key];
    });
    await product.save();
    res.status(200).json({ msg: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

prodRoute.delete("delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findByIdAndDelete({ _id: id });
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = { prodRoute };
