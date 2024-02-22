exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('name').notNullable().unique();
      table.string('email').notNullable().unique(); 
    //   table.string('password').notNullable();
      table.timestamps(true, true); // Adds created_at and updated_at columns
      // Add otherfields??
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  