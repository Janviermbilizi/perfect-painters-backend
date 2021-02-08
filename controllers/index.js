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
    firstname,
    lastname,
    servicecategory,
    servicearea,
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

  const url = `${process.env.GOOGLE_SHEET_URL}?First Name=${encodeURIComponent(
    firstname
  )}&Last Name=${encodeURIComponent(lastname)}&Phone=${encodeURIComponent(
    phone
  )}&Email=${encodeURIComponent(email)}&Service Category=${encodeURIComponent(
    servicecategory
  )}&Service Area=${encodeURIComponent(
    servicearea
  )}&Address=${encodeURIComponent(address)}&Address 2=${encodeURIComponent(
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
          body: `Hey Perfect Painters, A NEW PAINTING REQUEST JUST GOT ADDED. Name: ${firstname} ${lastname}. Phone: ${phone}. Service Category: ${servicecategory}. Service Area: ${servicearea}. City: ${city}. Message: ${message}. For more details, please see your google spreadsheet.`,
          to: `${THE_PERFECT_PAINTERS_PHONE_NUMBER}`, // Text this number
          from: `${TWILIO_PHONE_NUMBER}`, // From a valid Twilio number
        })
        .then((sms) =>
          res.json({
            message: `Sent! Thank you for submitting you request, ${firstname}. We will be in touch soon.`,
          })
        );
    })
    .catch((e) =>
      res.json({
        message: `Opps! Something went wrong!. Please try again later or call us at (301) 865-9833 to make your request.`,
      })
    );
};
