const db = require("../../config/database");
const { Model } = require("objection");
const Product = require("../model/product.model");

Model.knex(db);

class OrderItem extends Model {
    static get tableName() {
        return 'order_items';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['order_id', 'product_id', 'quantity', 'sub_total'],

            properties: {
                id: { type: 'integer' },
                order_id: { type: 'integer' },
                product_id: { type: 'integer' },
                quantity: { type: 'integer' },
                sub_total: { type: 'number' },
            },
        };
    }

    static get relationMappings() {
        return {
            product: {
                relation: Model.BelongsToOneRelation,
                modelClass: Product,
                join: {
                    from: 'order_items.product_id',
                    to: 'products.id',
                },
            },
        };
    }
}

module.exports = OrderItem;
