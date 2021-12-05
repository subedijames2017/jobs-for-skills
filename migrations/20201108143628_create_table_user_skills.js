exports.up = function(knex, Promise) {
    return knex.schema.createTable(`user_skills`, table => {
      table.increments(`id`).primary();
      table.integer(`user_id`).notNullable();
      table.json(`skills`);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable(`user_skills`);
  };
  