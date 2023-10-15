import * as grpc from "@grpc/grpc-js";
import path from "path";
import * as grpcLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/productService";

const PORT = 8082;

const packageDefinition = grpcLoader.loadSync(path.resolve(__dirname, "./proto/productService.proto"));
const grpcObj = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;
const productPackage = grpcObj.productService.productService;
