import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("stokeEntry", (table) => {
    table.uuid("id").primary();
    table.uuid("productId");
    table.text("operation").notNullable();
    table.integer("quantity").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("stokeEntry");
}
