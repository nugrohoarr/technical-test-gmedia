exports.up = function(knex) {
    return knex.schema.createTable('categories', (table) => {
      table.increments('id').primary();
      table.string('category_name').unique().notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.timestamp("deleted_at").nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('categories');
  };
  