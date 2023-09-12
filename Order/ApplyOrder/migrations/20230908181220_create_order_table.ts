import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("order", (table) => {
        table.uuid("id").primary();
        table.text("client_document").notNullable();
        table.text("code").unique();
        table.integer("sequence");
        table.decimal("total").notNullable();
        table.decimal("taxes").notNullable();
        table.decimal("discount").notNullable();
        table.decimal("freight").notNullable();
        table.text("status").defaultTo("open");
        table.timestamp("order_date").notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("order");
}
