exports.up = function (knex) {
    return knex.schema.table('employees', function (table) {
        table.string('photo');
        table.string('email');
    });
};

exports.down = function (knex) {
    return knex.schema.table('employees', function (table) {
        table.dropColumn('photo');
        table.dropColumn('email');
    });
};
