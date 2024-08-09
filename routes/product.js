const express = require("express");
const router = express.Router();
const multer = require('multer');

const ProductController = require("../app/controller/product.controller");
const upload = require("../middleware/upload.middleware");
const AuthMiddleware = require("../middleware/auth.middleware");
const productValidator = require("../app/validator/product.validator");

/**
 * @openapi
 * /products:
 *  post:
 *     tags:
 *     - Products
 *     summary: Add a new product
 *     security:
 *     - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - image
 *              - product_name
 *              - price
 *              - category_id
 *            properties:
 *              image:
 *               type: string
 *               format: binary
 *              product_name:
 *               type: string
 *               example: Banana
 *              price:
 *               type: number
 *               example: 99.99
 *              category_id:
 *               type: integer
 *               example: 1
 *     responses:
 *      201:
 *        description: Product created successfully
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 */
router.post("/products", upload.single('image'), productValidator, ProductController.addProduct);

/**
 * @openapi
 * /products:
 *  get:
 *     tags:
 *     - Products
 *     summary: Get all products
 *     security:
 *     - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *      500:
 *        description: Server Error
 */
router.get("/products", AuthMiddleware, ProductController.getProducts);

module.exports = router;
