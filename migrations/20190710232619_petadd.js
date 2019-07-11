
exports.up = async function(knex, Promise) {
    await knex.schema.hasTable("petAdd");

    return await knex.schema.createTable("petAdd", table => {
      table.increments("id").primary(),
        table.string("title"),
        table.string("price"),
        table.string("image"),
        table.string("Description")
    });
    
};

exports.down = function(knex, Promise) {
    knex.schema.dropTable("petAdd");

};
