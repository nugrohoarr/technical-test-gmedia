const { check, validationResult } = require("express-validator");

const categoryValidator = [
  check("category_name")
    .not()
    .isEmpty()
    .withMessage("Category name cannot be empty!")
    .isString()
    .withMessage("Category name must be a string"),

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

module.exports = categoryValidator;
