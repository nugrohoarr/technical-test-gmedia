const Order = require("../model/order.model");
const OrderItem = require("../model/order_item.model");
const Product = require("../model/product.model");

const createTransaction = async (req, res) => {
  try {
    const { user_id, items } = req.body;

    if (!user_id || !items || !items.length) {
      return res.status(400).json({
        message: "User ID and items are required!",
      });
    }

    const trx = await Order.startTransaction();

    try {
      const newOrder = await Order.query(trx).insert({
        user_id,
        order_date: new Date(),
        total_amount: 0,
      });

      let totalAmount = 0;

      for (let item of items) {
        const product = await Product.query(trx).findById(item.product_id);
        if (!product) {
          throw new Error(`Product with ID ${item.product_id} not found`);
        }

        const subTotal = product.price * item.quantity;
        totalAmount += subTotal;

        await OrderItem.query(trx).insert({
          order_id: newOrder.id,
          product_id: item.product_id,
          quantity: item.quantity,
          sub_total: subTotal,
        });
      }

      await Order.query(trx).findById(newOrder.id).patch({
        total_amount: totalAmount,
      });

      await trx.commit();

      res.status(201).json({
        message: "Transaction completed successfully!",
        data: newOrder,
      });
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation Error",
        errors: error.data,
      });
    }
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Order.query()
      .withGraphFetched('items.[product]')
      .select("*");

    res.status(200).json({
      message: "OK!",
      data: transactions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  createTransaction,
  getTransactions,
};
