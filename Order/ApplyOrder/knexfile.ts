<<<<<<< HEAD
require("ts-node/register");
import "dotenv/config";
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    client: "pg",
    connection: {
        host: process.env.HOST,
        port: process.env.DB_PORT,
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
    timezone: "UTC",
};
=======
require("ts-node/register");
import "dotenv/config";
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    client: "pg",
    connection: {
        host: process.env.HOST,
        port: process.env.DB_PORT,
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
        directory: "../dataModel/migrations",
    },
    timezone: "UTC",
};
>>>>>>> a65b844d36be53b1777984772a2a5aa4a97b7cee
