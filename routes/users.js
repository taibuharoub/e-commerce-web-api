const express = require("express");

const User = require("../models/User")

const router = express.Router();

router.get("/", async (req, res, next) => {
    const userList = await User.find();

    if(!userList) {
        res.status(500).json({success: false})
    }
    res.send(userList)
})

router.post("/", async (req, res, next) => {
    let user = new User ({
        name: req.body.name,
        email: req.body.email,
        passwordHash: req.body.passwordHash,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country
    })

    user = await user.save();

    if(!user)
    return res.status(400).send("The user cant be created")

    res.send(user);
})

module.exports = router;