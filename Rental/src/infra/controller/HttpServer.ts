export interface HttpServer {
    on(method: string, url: string, callback: (req: any, res: any) => void): void;
    listen(port: number, callback: Function): void;
}
