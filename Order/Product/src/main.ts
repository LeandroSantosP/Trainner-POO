import dot from "dotenv";
import grpcLoader from "@grpc/proto-loader";

import { ProductService } from "./application/services/ProductService";
import { ProductRepositoryKnex } from "./infra/repository/ProductRepositoryKnex";
import { GrpcServer } from "./infra/grpc/grpcServer";
dot.config();

const productRepository = new ProductRepositoryKnex();
const productService = new ProductService(productRepository);

new GrpcServer(productService).init();
