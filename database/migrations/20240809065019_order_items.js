exports.up = function(knex) {
    return knex.schema.createTable('order_items', (table) => {
      table.increments('id').primary();
      table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE');
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE');
      table.integer('quantity').notNullable();
      table.decimal('sub_total', 12, 2);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('order_items');
  };
  