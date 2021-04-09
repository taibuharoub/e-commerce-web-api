const express = require("express");
const mongoose = require("mongoose")

const Product = require("../models/Product");
const Category = require("../models/Category");

const router = express.Router();

// router.get(`/`, async (req, res, next) => {
//   // const products = await Product.find().select("name")
//   // const products = await Product.find().select("name image")
//   // const products = await Product.find().select("name image -_id")
//   const products = await Product.find().populate("category");

//   if (!products) {
//     return res.status(500).json({
//       data: {},
//       success: false,
//     });
//   }
//   res.json(products);
// });

router.get(`/`, async (req, res, next) => {
  let filter = {}
  if(req.query.categories) {
     filter = {category: req.query.categories.split(",")}
  }
  const products = await Product.find(filter).populate("category");

  if (!products) {
    return res.status(500).json({
      data: {},
      success: false,
    });
  }
  res.json(products);
});

router.get(`/:id`, async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    return res.status(500).json({
      success: false,
    });
  }
  res.json(product);
});

router.post(`/`, async (req, res, next) => {
  // const { name, description, image, countInStock } = req.body;

  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

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

  if (!product) return res.status(500).send("The product cannot be created");

  res.status(200).send(product);
});

router.put("/:id", async (req, res, next) => {
  if(!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product id")
  }
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
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
    },
    { new: true }
  );

  if (!product) return res.status(500).send("The product cannot be updated");

  res.send(product);
});

router.delete("/:id", (req, res, next) => {
  Product.findByIdAndRemove(req.params.id)
    .then(product => {
        if(product) {
            return res.status(200).json({
                success: true,
                message: "the product has been deleted!"
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "product not found"
            })
        }
    })
    .catch((err) => {
        return res.status(400).json({
            success: false,
            error: err
        })
    });
});

router.get(`/get/count`, async (req, res, next) => {
  const productCount = await Product.countDocuments((count) => count)

  if (!productCount) {
    return res.status(500).json({
      success: false,
    });
  }
  res.json({productCount: productCount});
});

router.get(`/get/featured`, async (req, res, next) => {
  const products = await Product.find({isFeatured: true})

  if (!products) {
    return res.status(500).json({
      success: false,
    });
  }
  res.json(products);
});

router.get(`/get/featured/:count`, async (req, res, next) => {
  const count = req.params.count ? req.params.count : 0
  const products = await Product.find({isFeatured: true}).limit(+count)

  if (!products) {
    return res.status(500).json({
      success: false,
    });
  }
  res.json(products);
});

module.exports = router;
