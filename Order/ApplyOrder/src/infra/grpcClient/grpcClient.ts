import * as grpc from "@grpc/grpc-js";
import path from "path";
import * as grpcLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/productService";

const PORT = 8082;

const packageDefinition = grpcLoader.loadSync(path.resolve(__dirname, "./proto/productService.proto"));
const grpcObj = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;
const client = new grpcObj.productServicePackage.productService(`0.0.0.0:${PORT}`, grpc.credentials.createInsecure());

const deadLine = new Date();
deadLine.setSeconds(deadLine.getSeconds() + 5);
client.waitForReady(deadLine, (err) => {
    if (err) {
        console.error(err);
        return;
    }

    startClient();
});

function startClient() {
    client.GetProducts(
        {
            productIds: ["3faccc5e-ab42-405e-b75e-45fba9c920cd"],
        },
        (err, result) => {
            if (err) {
                console.error(err);
                return;
            }

            console.log(result?.products);
        }
    );
}
