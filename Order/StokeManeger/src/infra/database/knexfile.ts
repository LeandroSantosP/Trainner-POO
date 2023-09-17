import knex from "knex";
import "dotenv/config";
// const config = require("../../../knexfile");
// console.log(config);
const knexConnection = knex({
    client: "pg",
    connection: {
        host: "0.0.0.0",
        port: 5432,
        user: "order",
        password: "1234",
        database: "postgres",
    },
    pool: { min: 2, max: 10 },
});
export default knexConnection;
