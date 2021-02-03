const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// Port that the webserver listens to
const port = process.env.PORT || 3000;

// app middleware -
app.use(bodyParser.json());

// app.use(cors()); // allows all origins
app.use(cors({ origin: process.env.CLIENT_URL }));

app.get("/", (req, res) => {
  res.send("Welcome to The Perfect Painters Site!");
});

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
