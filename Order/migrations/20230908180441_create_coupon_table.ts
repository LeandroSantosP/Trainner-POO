import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("coupon", (table) => {
        table.text("code").primary();
        table.decimal("percentage").notNullable();
        table.timestamp("expire_date");
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("coupon");
}
