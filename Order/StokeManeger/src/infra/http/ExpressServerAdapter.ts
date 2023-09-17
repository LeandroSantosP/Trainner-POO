import { Methods, httpServer } from "./httpServer";
import express, { Express } from "express";
export class ExpressServerAdapter implements httpServer {
    app: Express;

    constructor() {
        this.app = express();
        this.app.use(express.json());
    }

    on(method: Methods, url: string, callback: Function) {
        this.app[method](url, async (req, res) => {
            const output = await callback(req.body, req.params, req.query);
            res.json(output);
        });
    }

    listen(port: number, callback: any): void {
        this.app.listen(port, callback);
    }
}
