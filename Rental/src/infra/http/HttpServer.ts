export interface HttpServer {
    on(method: "post" | "get", url: string, callback: (body: any, params: any) => any): void;
    listen(port: number, callback: Function): void;
}
