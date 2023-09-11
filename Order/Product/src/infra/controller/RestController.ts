import { httpServer } from "../http/httpServer";
import { ProductService } from "@/application/services/ProductService";

export class RestController {
    constructor(httpServer: httpServer, productService: ProductService) {
        httpServer.on("get", "/products", async (body: any, params: any, query: any) => {
            const input = JSON.parse(query.productIds);
            const output = await productService.getProducts({ productIds: input });
            return output;
        });
    }
}
