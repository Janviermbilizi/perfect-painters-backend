const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
require("dotenv").config();
const Routes = require("./routes");

// Port that the webserver listens to
const port = process.env.PORT || 3001;

// app middleware -
app.use(bodyParser.json());
app.use(expressValidator());

// app.use(cors()); // allows all origins
app.use(cors({ origin: process.env.THE_PERFECT_PAINTERS_CLIENT_URL }));

app.use("/api", Routes);

app.listen(port, () => {
  console.log(`API is running on port ${port}`);
});
