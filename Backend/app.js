const express = require("express");
const FruitRoutes = require("./fruit-routes");
const bodyParser = require("body-parser");
const fruitList = require("./fruit-data.json");
const CartService = require("./cart-service");
const { purchase } = require("./cart-service");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 1234;

const apiRoutes = express.Router();

// TODO-1: need to npm install and run to start up this fruit server

// setup the fruit routes
FruitRoutes.setup(apiRoutes);

// TODO-4: need to setup route for cart purchase

app.use(bodyParser.json(), cors());

app.post("/purchase", async (req, res) => {
  // try {
  //   return res.status(200).json({ result: req.body });
  // } catch (e) {
  //   return res.status(400).json({ error: e });
  // }
  //1.connect app.js and cart-service
  //2.request -- fruitbill
  //3.response-- true or false
  try {
    const status = await CartService.purchase(req.body);
    return res.status(200).json(status);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e.message });
  }
  // res.status(200).json(req.body);
});

// app.get("/purchase", (req, res) => {
//   res.json({ status: "works" });
// });

// all REST api calls should be under api
app.use("/api", apiRoutes);

// basic get route for the system
app.get("/", (req, res) => {
  res.json({ error: "This is my api dammit" });
});

app.get("/show/:fruit", (req, res) => {
  // const fruit = req.params.name;
  res.status(200).json(fruitList.inventory[req.params.fruit]);
});

app.get("/fruitList", (req, res) => {
  res.status(200).json(fruitList);
});

// listening on the nodemon port configured in @see package.json
app.listen(port, (req, res) => {
  console.log(
    `fruit server started from nodemon and listening at http://localhost:${port}`
  );
});

// Custom Error handler for fruit server
app.use(function (err, req, res, next) {
  // TODO-5: handle common errors
});
