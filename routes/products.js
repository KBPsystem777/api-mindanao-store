const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let Product = require("../models/productModel");

// Fields needed for Product
router.route("/add").post((req, res) => {
  const _id = uuidv4();
  const active = true;
  const product_name = req.body.product_name;
  const price = req.body.price;
  const category = req.body.category;
  const quantity = Number(req.body.quantity);
  const details = req.body.details;
  const store_id = req.body.store_id;

  const newProduct = new Product({
    _id,
    active,
    product_name,
    price,
    category,
    quantity,
    details,
    store_id,
  });
  // Save new product
  newProduct
    .save()
    .then(() =>
      res.json({
        success: true,
        message: "Product Added!",
        time: new Date(),
        product: newProduct,
      })
    )
    .catch((err) =>
      res.json({
        success: false,
        message: `Error: ` + err,
      })
    );
});

// Route to get all products
router.route("/").get((req, res) => {
  Product.find()
    .then((products) =>
      res.json({
        success: true,
        time: new Date(),
        products: products,
      })
    )
    .catch((err) =>
      res.status(400).json({
        success: false,
        time: new Date(),
        error_message: err,
      })
    );
});

// Route to get all Products of the store
router.route("/:id/products").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) =>
      res.json(400).json({
        success: false,
        time: new Date(),
        message: `Error: ` + err,
      })
    );
});

// Get products records by ID#
router.route("/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) =>
      res.status(400).json({
        success: false,
        time: new Date(),
        message: `Error: ` + err,
      })
    );
});

// Delete a product record
router.route("/:id").delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json(`Product deleted!`))
    .catch((err) =>
      res.json(400).json({
        success: false,
        time: new Date(),
        message: `Error: ` + err,
      })
    );
});

// Update an existing product
router.route("/update/:id").post((req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      product.productName = req.body.productName;
      product.price = req.body.price;
      product.category = req.body.category;
      product.quantity = Number(req.body.quantity);
      product.expirationDate = Date.parse(req.body.expirationDate);

      product.save().then(() => res.json(`Product updated!`));
    })
    .catch((err) =>
      res.status(400).json({
        success: false,
        time: new Date(),
        message: `Error: ` + err,
      })
    );
});

module.exports = router;
