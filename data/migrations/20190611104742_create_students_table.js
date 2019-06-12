// npx knex migrate:make create_students_table

exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function (table) {
      table.increments();
      table.text('name').notNullable();
      table.integer('cohort_id').notNullable().references('id').inTable('cohorts');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
