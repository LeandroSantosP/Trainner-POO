import * as grpc from "@grpc/grpc-js";
import path from "path";
import * as grpcLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/productService";
import { productServiceHandlers } from "./proto/productService/productService";

const PORT = 8082;

const packageDefinition = grpcLoader.loadSync(path.resolve(__dirname, "./proto/productService.proto"));
const grpcObj = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;
const productPackage = grpcObj.productService;

function main() {
    const server = getServer();

    server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`Server Grpc is running on port => ${port}`);
        server.start();
    });
}

function getServer() {
    const server = new grpc.Server();

    server.addService(productPackage.productService.service, {
        GetProducts(req, res) {
            console.log(req, res);
        },
    } as productServiceHandlers);

    return server;
}

main();
