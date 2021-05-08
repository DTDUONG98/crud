
exports.up = function (knex) {
  return knex.schema.createTable('admin_permissions', function (table) {
    table.increments();
    table.string('name').nullable();
    table.text('description').nullable();
    table.integer('value').defaultTo(0);
    table.string('key').nullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.integer('createdBy').nullable().index().references('id').inTable('admins')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('admin_permissions');
};
