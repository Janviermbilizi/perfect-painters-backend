const fetch = require("node-fetch");
require("dotenv").config();

exports.addCustomerToGoogleSpreadsheet = (req, res) => {
  const {
    username,
    phone,
    email,
    address,
    address2,
    city,
    state,
    zip,
    message,
  } = req.body;

  let date = new Date();
  let status = "New";

  const url = `${process.env.GOOGLE_SHEET_URL}?Name=${encodeURIComponent(
    username
  )}&Phone=${encodeURIComponent(phone)}&Email=${encodeURIComponent(
    email
  )}&Address=${encodeURIComponent(address)}&Address2=${encodeURIComponent(
    address2
  )}&City=${encodeURIComponent(city)}&State=${encodeURIComponent(
    state
  )}&Zip=${encodeURIComponent(zip)}&Message=${encodeURIComponent(
    message
  )}&Date=${encodeURIComponent(date)}&Status=${encodeURIComponent(status)}`;

  fetch(url)
    .then((sent) =>
      res.json({
        message: `Sent! Thank you for submitting you request, ${username}. We Will be in touch soon.`,
      })
    )
    .catch((e) =>
      res.json({
        message: `OH No! Something went wrong, ${username}. Please try again later or call us at (301) 865-9833 to make your request.`,
      })
    );
};
