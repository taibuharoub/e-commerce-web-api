const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const app = express();
const port = 3000;

const produtRoutes = require("./routes/products")
const categoryRoutes = require("./routes/catgories")
const userRoutes = require("./routes/users")
const orderRoutes = require("./routes/orders");

require("dotenv/config");
const api = process.env.API_URL;

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use(`${api}/categories`, categoryRoutes);
app.use(`${api}/products`, produtRoutes);
app.use(`${api}/users`, userRoutes);
app.use(`${api}/orders`, orderRoutes);


mongoose
  .connect(process.env.DB_CON, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`.inverse);
});
