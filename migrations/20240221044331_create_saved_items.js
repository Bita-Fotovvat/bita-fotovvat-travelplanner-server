exports.up = function(knex) {
    // return knex.schema.createTable('saved_items', table => {
    //   table.increments('id').primary();
    //   table.string('location_id').notNullable();
    //   table.enum('type', ['hotel', 'attraction', 'restaurant']).notNullable();
    //   table.text('user_notes');
    //   table.integer('user_id').unsigned().notNullable();
    // //   table.foreign('user_id').references('users.id');
    //   table.timestamps(true, true); // Adds created_at and updated_at columns

    return knex.schema.createTable('saved_items', (table) => {
      table.increments('id').primary();
      table.string('category').notNullable();
      table.string('name').notNullable();
      table.string('address').notNullable();
      table.string('phone').notNullable();
      // table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('saved_items');
  };
  