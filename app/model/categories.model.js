const db = require("../../config/database");
const { Model } = require("objection");

Model.knex(db);

class Category extends Model {
  static get tableName() {
    return "categories";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["category_name"],

      properties: {
        id: { type: "integer" },
        category_name: { type: "string" },
      },
    };
  }
}

module.exports = Category;
