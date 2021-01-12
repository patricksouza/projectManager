exports.up = function (knex) {
    return knex.schema.createTable('project', function (table) {
        table.increments('id').primary();
        table.string('name');
        table.date('start_date').notNullable();
        table.date('finish_date').notNullable();
        table.decimal('budget');
        table.integer('project_risk');
        table.specificType('participants', 'text ARRAY');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('project');
};
