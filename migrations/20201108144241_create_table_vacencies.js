exports.up = function(knex, Promise) {
    return knex.schema.createTable(`vacencies`, table => {
      table.increments(`id`).primary();
      table.string(`title`);
      table.string(`description`);
      table.string(`link`);
      table.integer(`avatar`);
      table.string(`job_portal`);
      table.boolean(`expired`).comment('0=>expired,1=>unexpired');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable(`vacencies`);
  };
  