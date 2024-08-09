const { check, validationResult } = require("express-validator");

const transactionValidator = [
  // Validasi user_id
  check("user_id")
    .isInt({ min: 1 }).withMessage("User ID must be a positive integer")
    .notEmpty().withMessage("User ID cannot be empty!"),

  // Validasi items
  check("items")
    .isArray({ min: 1 }).withMessage("Items must be a non-empty array")
    .notEmpty().withMessage("Items cannot be empty!"),

  // Validasi item dalam items array
  check("items.*.product_id")
    .isInt({ min: 1 }).withMessage("Product ID must be a positive integer")
    .notEmpty().withMessage("Product ID cannot be empty!"),

  check("items.*.quantity")
    .isInt({ min: 1 }).withMessage("Quantity must be a positive integer")
    .notEmpty().withMessage("Quantity cannot be empty!"),

  // Validasi total_amount
  check("total_amount")
    .optional()
    .isFloat({ min: 0 }).withMessage("Total amount must be a positive number")
    .notEmpty().withMessage("Total amount cannot be empty!"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array().map(error => ({
          item_name: error.param,
          message: error.msg
        }))
      });
    }
    next();
  }
];

module.exports = transactionValidator;
