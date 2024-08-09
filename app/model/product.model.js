const db = require("../../config/database");
const { Model } = require("objection");

Model.knex(db);

class Product extends Model {
  static get tableName() {
    return "products";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["images", "product_name", "price", "category_id"],

      properties: {
        id: { type: "integer" },
        images: { type: "string" },
        product_name: { type: "string" },
        price: { type: "number" },
        category_id: { type: "integer" },
      },
    };
  }

  static get relationMappings() {
    const Category = require("./categories.model");

    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: "products.category_id",
          to: "categories.id",
        },
      },
    };
  }
}

module.exports = Product;
