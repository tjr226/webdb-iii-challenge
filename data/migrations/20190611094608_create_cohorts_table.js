// npx knex migrate:make create_cohorts_table

// new changes to db schema
exports.up = function (knex, Promise) {
    knex.schema.createTable('cohorts', function (table) {
        table.increments();
        table.text().notNullable().unique();
    })
};

// how to undo changes to db schema
exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('cohorts');
};
