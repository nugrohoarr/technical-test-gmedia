exports.up = function(knex) {
    return knex.schema.createTable('products', (table) => {
      table.increments('id').primary();
      table.string('product_name').notNullable();
      table.string('images').notNullable();
      table.float('price').notNullable();
      table.integer('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE');
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
      table.timestamp("deleted_at").nullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('products');
  };
  