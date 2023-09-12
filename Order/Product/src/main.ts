import dot from "dotenv";
import { ProductService } from "./application/services/ProductService";
import { ProductRepositoryMemory } from "./infra/repository/ProductRepositoryMemory";
import { RestController } from "./infra/controller/RestController";
import { ExpressServerAdapter } from "./infra/http/ExpressServerAdapter";
dot.config();
const productRepository = new ProductRepositoryMemory();
const productService = new ProductService(productRepository);
const httpServer = new ExpressServerAdapter();
new RestController(httpServer, productService);
httpServer.listen(3001, () => console.log("Server is running on port 3001"));
