const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res, next) => {
    res.send("<h1>E-Shop</h1>")
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})
