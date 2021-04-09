const express = require("express");

const Product = require("../models/Product");
const Category = require("../models/Category")

const router = express.Router();

router.get(`/`, async (req, res, next) => {
  // const products = await Product.find().select("name")
  // const products = await Product.find().select("name image")
  // const products = await Product.find().select("name image -_id")
  const products = await Product.find().populate("category")

  if(!products) {
      return res.status(500).json({
          data: {},
          success: false
      })
  }
  res.json(products);
});


router.get(`/:id`, async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("category")

  if(!product) {
      return res.status(500).json({
          success: false
      })
  }
  res.json(product);
});

router.post(`/`, async (req, res, next) => {
  // const { name, description, image, countInStock } = req.body;

  const category = await Category.findById(req.body.category);
  if(!category) return res.status(400).send("Invalid Category")

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });
  
  product = await product.save();

  if(!product) return res.status(500).send("The product cannot be created")

  res.status(200).send(product);
});


module.exports = router;
