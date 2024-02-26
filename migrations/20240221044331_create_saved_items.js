exports.up = function(knex) {
    return knex.schema.createTable('saved_items', (table) => {
      table.increments('id').primary();
      table.string('category').notNullable();
      table.string('name').notNullable();
      table.string('address').notNullable();
      table.string('phone').notNullable();
      table
      .integer("user_id")
      .unsigned()
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    });
};
exports.down = function(knex) {
    return knex.schema.dropTable('saved_items').dropTable("users");
};
  