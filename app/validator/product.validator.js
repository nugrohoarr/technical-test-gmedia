const { check, validationResult } = require("express-validator");

const productValidator = [
  check("product_name")
    .not()
    .isEmpty()
    .withMessage("Product name cannot be empty!"),

  check("price")
    .not()
    .isEmpty()
    .withMessage("Price cannot be empty!")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),

  check("category_id")
    .not()
    .isEmpty()
    .withMessage("Category ID cannot be empty!")
    .isInt({ gt: 0 })
    .withMessage("Category ID must be a positive integer"),

  (req, res, next) => {
    const errors = validationResult(req);

    const errorData = errors.array().map((error) => ({
      item_name: error.param,
      message: error.msg,
    }));

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errorData });
    }

    next();
  },
];

module.exports = productValidator;
