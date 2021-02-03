exports.addCustomerValidator = (req, res, next) => {
  // name
  req.check("username", "Please provide your name!").notEmpty();
  req
    .check("username", "The name must be between 3 to 40 characters")
    .isLength({
      min: 3,
      max: 40,
    });

  // phone
  req.check("phone", "Please provide your phone!").notEmpty();
  req.check("phone", "Please provide a correct phone number!").isLength({
    min: 10,
    max: 15,
  });
  //email
  req.check("email", "Please provide a correct email!").isEmail();

  //address
  req.check("address", "Please provide your address!").notEmpty();
  req
    .check("address", "The address must be between 5 to 50 characters")
    .isLength({
      min: 5,
      max: 50,
    });
  //address2
  req
    .check("address2", "The address 2 must be no more than 20 characters")
    .isLength({
      max: 20,
    });

  //city
  req.check("city", "Please provide your City!").notEmpty();
  req.check("city", "The city must be between 5 to 40 characters").isLength({
    min: 5,
    max: 40,
  });

  //State
  req.check("state", "Please provide your state!").notEmpty();
  req.check("state", "The state must be between 2 to 40 characters").isLength({
    min: 2,
    max: 40,
  });

  //zip
  req.check("zip", "Please provide your zip code!").notEmpty();
  req.check("zip", "The zip code must be between 5 to 10 characters").isLength({
    min: 5,
    max: 10,
  });

  //zip
  req
    .check(
      "message",
      "Please tell us a little bit about your request in the message texterea!"
    )
    .notEmpty();
  req
    .check("message", "The massage must be between 4 to 2000 characters")
    .isLength({
      min: 4,
      max: 2000,
    });

  // check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middleware
  next();
};
