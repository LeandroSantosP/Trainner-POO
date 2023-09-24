import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("message", (table) => {
    table.uuid("id").primary();
    table.text("from").notNullable();
    table.text("to").notNullable();
    table.text("subject").notNullable();
    table.text("body").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("message");
}
