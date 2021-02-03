const fetch = require("node-fetch");
require("dotenv").config();

exports.addCustomerToGoogleSpreadsheet = (req, res) => {
  const body = req.body;
  //console.log(body);

  let date = new Date();
  let status = "New";

  const url = `${process.env.GOOGLE_SHEET_URL}?Name=${encodeURIComponent(
    body.username
  )}&Phone=${encodeURIComponent(body.phone)}&Email=${encodeURIComponent(
    body.email
  )}&Address=${encodeURIComponent(body.address)}&Address2=${encodeURIComponent(
    body.address2
  )}&City=${encodeURIComponent(body.city)}&State=${encodeURIComponent(
    body.state
  )}&Zip=${encodeURIComponent(body.zip)}&Message=${encodeURIComponent(
    body.message
  )}&Date=${encodeURIComponent(date)}&Status=${encodeURIComponent(status)}`;

  fetch(url)
    .then((data) => res.json(data))
    .catch((e) => res.json(e));
};
