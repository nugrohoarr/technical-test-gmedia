const { Model } = require("objection");
const db = require("../../config/database");
const OrderItem = require("../model/order_item.model");

Model.knex(db);

class Order extends Model {
  static get tableName() {
      return 'orders';
  }

  static get jsonSchema() {
      return {
          type: 'object',
          required: ['user_id', 'total_amount'],

          properties: {
              id: { type: 'integer' },
              user_id: { type: 'integer' },
              total_amount: { type: 'number' },
              // order_date: { type: 'string' }, // Removed format
          },
      };
  }

  static get relationMappings() {
      return {
          items: {
              relation: Model.HasManyRelation,
              modelClass: OrderItem,
              join: {
                  from: 'orders.id',
                  to: 'order_items.order_id',
              },
          },
      };
  }
}

module.exports = Order;
