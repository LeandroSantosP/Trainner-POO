import * as grpc from "@grpc/grpc-js";
import path from "path";
import * as grpcLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/productService";
import "dotenv/config";
import { Output, ProductGateWay } from "@/application/interfaces/ProductGateway";
import { productServiceClient } from "./proto/productServicePackage/productService";

export class ProductGrpcGateway implements ProductGateWay {
    private client: productServiceClient;
    private deadLine: Date;
    constructor() {
        const PORT = process.env.GRPC_PORT || 8082;
        const packageDefinition = grpcLoader.loadSync(path.resolve(__dirname, "./proto/productService.proto"));
        const grpcObj = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;
        const client = new grpcObj.productServicePackage.productService(
            `0.0.0.0:${PORT}`,
            grpc.credentials.createInsecure()
        );
        const deadLine = new Date();
        deadLine.setSeconds(deadLine.getSeconds() + 5);
        this.deadLine = deadLine;
        this.client = client;
    }
    async getProducts(productIds: string[]): Promise<Output> {
        return new Promise<any>((resolve, reject) => {
            this.client.waitForReady(this.deadLine, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                this.client.GetProducts(
                    {
                        productIds,
                    },
                    (err, result) => {
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                        resolve(result?.products);
                    }
                );
            });
        });
    }
}
