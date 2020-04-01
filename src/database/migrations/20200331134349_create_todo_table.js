exports.up = function (knex) {
    return knex.schema.createTable('todos', function (table) {
        table.string('id').primary()
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.string('dateend').notNullable();
        table.string('datestart').notNullable();
    })
};

exports.down = function (knex) {
    knex.schema.dropTable('todos');
};