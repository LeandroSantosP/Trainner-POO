import knex from "knex";
import config from "../../../knexfile";
import "dotenv/config";

const knexConnection = knex(config);

export default knexConnection;
