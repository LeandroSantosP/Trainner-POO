import { ProductRepository } from "../repository/ProductRepository";

export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async getProducts(input: Input): Promise<Output> {
        if (!input.productIds) throw new Error("productsIds was required");
        let output: Output = {
            products: [],
        };
        for (const productId of input.productIds) {
            const prod = await this.productRepository.getById(productId);
            output.products.push({
                name: prod.name,
                price: prod.getPrice(),
                productId: prod.id,
                weight: prod.dimensions.weight,
                density: prod.dimensions.getDensity(),
                volume: prod.dimensions.getVolume(),
                fare: prod.fare,
            });
        }
        return output;
    }
}

type Input = { productIds: Array<string> };

type Output = {
    products: Array<{
        productId: string;
        price: number;
        name: string;
        weight: number;
        density: number;
        volume: number;
        fare?: number;
    }>;
};
