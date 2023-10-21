import * as grpc from "@grpc/grpc-js";
import * as grpcLoader from "@grpc/proto-loader";
import path from "path";
import "dotenv/config";
import { ProtoGrpcType } from "./proto/productService";
import { productServiceHandlers } from "./proto/productServicePackage/productService";
import { ProductService } from "@/application/services/ProductService";
import { GetProductsResponse } from "./proto/productServicePackage/GetProductsResponse";
import { GetProductsRequest__Output } from "./proto/productServicePackage/GetProductsRequest";
const PORT = process.env.GRPC_PORT || 8082;

const packageDefinition = grpcLoader.loadSync(path.resolve(__dirname, "./proto/productService.proto"));
const grpcObj = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;
const productPackage = grpcObj.productServicePackage;
export class GrpcServer {
    app: typeof grpc;

    constructor(readonly productService: ProductService) {
        this.app = grpc;
    }

    init() {
        const server = this.getServer();

        server.bindAsync(`0.0.0.0:${PORT}`, this.app.ServerCredentials.createInsecure(), (err, port) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`Server Grpc is running on port => ${port}`);
            server.start();
        });
    }
    getServer() {
        const server = new this.app.Server();

        server.addService(productPackage.productService.service, {
            GetProducts: async (req, res) => {
                const response = await this.productService.getProducts({ productIds: req.request.productIds! });
                res(null, response);
            },
        } as productServiceHandlers);

        return server;
    }
}
