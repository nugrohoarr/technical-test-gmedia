const express = require("express");
const router = express.Router();

const TransactionController = require("../app/controller/transaction.controller");
const AuthMiddleware = require("../middleware/auth.middleware");
const transactionValidator = require("../app/validator/transaction.validator");

/**
 * @openapi
 * /transactions:
 *  post:
 *     tags:
 *     - Transactions
 *     summary: Create a new transaction
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - user_id
 *              - items
 *            properties:
 *              user_id:
 *               type: integer
 *               example: 1
 *              items:
 *                type: array
 *                items:
 *                  type: object
 *                  required:
 *                    - product_id
 *                    - quantity
 *                  properties:
 *                    product_id:
 *                     type: integer
 *                     example: 1
 *                    quantity:
 *                     type: integer
 *                     example: 2
 *     responses:
 *      201:
 *        description: Transaction completed successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: User or Product not found
 *      500:
 *        description: Internal Server Error
 */
router.post("/transactions", AuthMiddleware, transactionValidator, TransactionController.createTransaction);

/**
 * @openapi
 * /transactions:
 *  get:
 *     tags:
 *     - Transactions
 *     summary: Get all transactions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Transactions retrieved successfully
 *      500:
 *        description: Internal Server Error!
 */
router.get("/transactions", AuthMiddleware, TransactionController.getTransactions);

module.exports = router;
