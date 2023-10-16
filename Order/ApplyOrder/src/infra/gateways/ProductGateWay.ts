import { ProductGateWay } from "@/application/interfaces/ProductGateway";
import { httpClient } from "../httpClient/httpClient";

export class ProductGateway implements ProductGateWay {
    constructor(readonly http: httpClient) {}
    async getProducts(productIds: string[]): Promise<Output> {
        const output = await this.http.get("/products", "productIds", productIds);
        return output.products;
    }
}

type Output = {
    productId: string;
    price: number;
    name: string;
    weight: number;
    density: number;
    volume: number;
    fare?: number;
}[];
