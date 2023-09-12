import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("product", (table) => {
    table.uuid("id").primary();
    table.text("name").notNullable();
    table.text("description").notNullable();
    table.decimal("price").notNullable();
    table.decimal("fare");
    table.decimal("volume").notNullable();
    table.decimal("density").notNullable();
    table.integer("weight").notNullable();
    table.integer("width").notNullable();
    table.integer("height").notNullable();
    table.integer("length").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("product");
}
