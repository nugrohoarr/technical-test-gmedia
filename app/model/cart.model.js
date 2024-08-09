const { Model } = require('objection');
const Product = require('../model/product.model');
const User = require('../model/user.model');

const db = require('../../config/database');

Model.knex(db);

class Cart extends Model {
    static get tableName() {
        return 'cart';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['user_id', 'product_id', 'quantity'],

            properties: {
                id: { type: 'integer' },
                user_id: { type: 'integer' },
                product_id: { type: 'integer' },
                quantity: { type: 'integer' },
            },
        };
    }

    static get relationMappings() {
        return {
            product: {
                relation: Model.BelongsToOneRelation,
                modelClass: Product,
                join: {
                    from: 'cart.product_id',
                    to: 'products.id',
                },
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'cart.user_id',
                    to: 'users.id',
                },
            },
        };
    }
}

module.exports = Cart;
