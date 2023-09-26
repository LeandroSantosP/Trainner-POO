import { Elysia } from "elysia";

const app = new Elysia();

async function main() {
    app.state("version", 1)
        .decorate("my_id", () => "1234")
        .get("/version", ({ my_id, store: { version } }) => `${version} ${my_id()}`);
    app.listen(3000);
}

main();
