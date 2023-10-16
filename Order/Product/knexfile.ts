import "dotenv/config";
import { Knex } from "knex";

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const knexConfig: Knex.Config = {
    client: "pg",
    connection: {
        host: process.env.HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: "postgres",
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: "knex_migrations",
        directory: "../database/migrations",
    },
};

export default knexConfig;
