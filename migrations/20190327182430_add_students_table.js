
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl) {
      tbl.increments();

      tbl.string('name', 255)
        .notNullable()
        .unique();
      
      tbl.integer('cohorts_id')
        .unsigned()
        .references('id')
        .inTable('cohorts')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
