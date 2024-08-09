const express = require("express");
const router = express.Router();

const CategoryController = require("../app/controller/categories.controller")
const AuthMiddleware = require("../middleware/auth.middleware");
const categoryValidator = require("../app/validator/categories.validator");

/**
 * @openapi
 * /categories:
 *  post:
 *     tags:
 *     - Categories
 *     summary: Add a new category
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - category_name
 *            properties:
 *              category_name:
 *               type: string
 *               example: Electronics
 *     responses:
 *      201:
 *        description: Added category successfully
 *      400:
 *        description: Bad Request
 *      500:
 *        description:  Internal Server Error!
 */
router.post("/categories", AuthMiddleware, categoryValidator, CategoryController.addCategory);

/**
 * @openapi
 * /categories:
 *  get:
 *     tags:
 *     - Categories
 *     summary: Get all categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *       
 *      500:
 *        description: Server Error
 */
router.get("/categories", AuthMiddleware, CategoryController.getCategories);

module.exports = router;
