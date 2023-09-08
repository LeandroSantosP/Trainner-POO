import knex from "knex";
const config = require("../../../knexfile");
import "dotenv/config";
console.log(config);
const knexConnection = knex(config);
export default knexConnection;
