exports.up = function (knex) {
    return knex.schema.createTable('employees', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('position').notNullable();
        table.integer('manager_id').unsigned().references('id').inTable('employees').onDelete('SET NULL');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('employees');
};
