import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("address", (table) => {
    table.text("document").primary();
    table.text("street").notNullable();
    table.text("city").notNullable();
    table.text("neighborhood").notNullable();
    table.decimal("latitude").notNullable();
    table.decimal("longitude").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("address");
}
