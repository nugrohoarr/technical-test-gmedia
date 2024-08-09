const db = require("../../config/database");

const { Model } = require("objection");

Model.knex(db);

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",

      required: ["name", "username", "password"],

      properties: {
        name: {
          type: "string",
        },
        username: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    };
  }
}

module.exports = User;
