exports.up = function(knex) {
    return knex.schema.createTable('cart', (table) => {
      table.increments('id').primary();
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE');
      table.integer('quantity').notNullable();
      table.decimal('sub_total', 12, 2);
      table.decimal('total', 12, 2);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('cart');
  };
  