const express = require("express");

const Order = require("../models/Order")

const router = express.Router();

router.get("/", async (req, res, next) => {
    const orderList = await Order.find();

    if(!orderList) {
        res.status(500).json({success: false})
    }
    res.send(orderList)
})

module.exports = router;