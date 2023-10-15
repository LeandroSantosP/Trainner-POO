import dot from "dotenv";
import grpcLoader from "@grpc/proto-loader";

import { ProductService } from "./application/services/ProductService";
import { RestController } from "./infra/controller/RestController";
import { ExpressServerAdapter } from "./infra/http/ExpressServerAdapter";
import { ProductRepositoryKnex } from "./infra/repository/ProductRepositoryKnex";
dot.config();
const productRepository = new ProductRepositoryKnex();
const productService = new ProductService(productRepository);
const httpServer = new ExpressServerAdapter();
new RestController(httpServer, productService);
httpServer.listen(3001, () => console.log("Server is running on port 3001"));
