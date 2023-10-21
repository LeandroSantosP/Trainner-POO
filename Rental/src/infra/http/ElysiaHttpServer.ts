import { Elysia } from "elysia";
import { HttpServer } from "./HttpServer";

export class ElysiaHttpServer implements HttpServer {
    app: Elysia;
    constructor() {
        this.app = new Elysia();
    }

    on(method: "post" | "get", url: string, callback: (req: any, res: any) => any): void {
        this.app[method](url, async (cpx) => {
            try {
                const out = await callback(cpx.body, cpx.params);
                cpx.set.status = 201;
                return out;
            } catch (error: any) {
                cpx.set.status = 500;
                console.log(error);
                return {
                    message: "Internal server error.",
                    error: error.message,
                };
            }
        });
    }
    listen(port: number, callback: Function): void {
        this.app.listen(port, ({ hostname, port }) => {
            callback(`Running at http://${hostname}:${port}`);
        });
    }
}
