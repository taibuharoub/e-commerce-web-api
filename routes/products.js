const express = require("express");

const Product = require("../models/Product");

const router = express.Router();

router.get(`/`, async (req, res, next) => {
  const products = await Product.find()

  if(!products) {
      return res.status(500).json({
          data: {},
          success: false
      })
  }
  res.json(products);
});

router.post(`/`, (req, res, next) => {
  const { name, image, countInStock } = req.body;
  const product = new Product({
    name,
    image,
    countInStock,
  });
  product
    .save()
    .then((product) => {
      res.status(201).json(product);
    })
    .catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    });
});


module.exports = router;
