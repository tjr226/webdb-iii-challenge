// npx knex migrate:make create_cohorts_table
// npx knex migrate:latest

// new changes to db schema
exports.up = function (knex, Promise) {
    return knex.schema.createTable('cohorts', function (table) {
        table.increments();
        table.text('name').notNullable();
    })
};

// how to undo changes to db schema
exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('cohorts');
};

