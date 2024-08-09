exports.up = function(knex) {
    return knex.schema.createTable('orders', (table) => {
      table.increments('id').primary();
      table.timestamp('order_date').defaultTo(knex.fn.now());
      table.decimal('total_amount', 12, 2);
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('orders');
  };
  