export type Methods = "post" | "get";

export interface httpServer {
    on(method: Methods, url: string, callback: Function): void;
    listen(port: number, callback: any): void;
}
