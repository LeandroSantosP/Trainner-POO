import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("order_line", (table) => {
        table.uuid("id").primary();
        table.integer("quantity");
        table.decimal("total").notNullable();
        table.decimal("fare");
        table.decimal("min_fare");
        table.uuid("order_id").unique().unsigned();
        table.foreign("order_id").references("order.id").onDelete("CASCADE").onUpdate("CASCADE");
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("order_line");
}
