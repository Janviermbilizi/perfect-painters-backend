const fetch = require("node-fetch");
const express = require("express");
const router = express.Router();
const { addCustomerToGoogleSpreadsheet } = require("../controllers");
const { addCustomerValidator } = require("../validators");

router.post(
  "/paintingrequest",
  addCustomerValidator,
  addCustomerToGoogleSpreadsheet
);

module.exports = router;
