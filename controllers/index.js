const fetch = require("node-fetch");
require("dotenv").config();
const {
  TWILIO_AUTH_TOKEN,
  TWILIO_ACCOUNT_SID,
  TWILIO_PHONE_NUMBER,
  THE_PERFECT_PAINTERS_PHONE_NUMBER,
} = process.env;
const twilio = require("twilio");

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
    .then((sent) => {
      const TWILIO_CLIENT = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

      TWILIO_CLIENT.messages
        .create({
          body: `Hey Perfect Painters, A NEW PAINTING REQUEST JUST GOT ADDED. Name: ${username}. Phone: ${phone}. City: ${city}. Message: ${message}. For more details, please see your google spreadsheet.`,
          to: `${THE_PERFECT_PAINTERS_PHONE_NUMBER}`, // Text this number
          from: `${TWILIO_PHONE_NUMBER}`, // From a valid Twilio number
        })
        .then((sms) =>
          res.json({
            message: `Sent! Thank you for submitting you request, ${username}. We will be in touch soon.`,
          })
        );
    })
    .catch((e) =>
      res.json({
        message: `OH No! Something went wrong, ${username}. Please try again later or call us at (301) 865-9833 to make your request.`,
      })
    );
};
