const express = require("express");

const Category = require("../models/Category")

const router = express.Router();

router.get("/", async (req, res, next) => {
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false})
    }
    res.send(categoryList)
})

module.exports = router;