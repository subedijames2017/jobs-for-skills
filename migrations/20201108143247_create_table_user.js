exports.up = function(knex, Promise) {
    return knex.schema.createTable(`user`, table => {
      table.increments(`id`).primary();
      table.integer(`first_name`);
      table.integer(`last_name`);
      table.integer(`email`);
      table.string(`avatar`);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable(`user`);
  };
  