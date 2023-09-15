import dovEnv from "dotenv";
import { RabbitMqAdapter } from "./infra/queue/RabbitMqAdapter";

dovEnv.config();

async function main() {
    console.log("running!!");
}

main();
new RabbitMqAdapter();
