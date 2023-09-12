import { ProductRepository } from "@/application/repository/ProductRepository";
import { Product } from "@/domain/entity/Product";
import knexConnection from "../database/knexfile";
import { Knex } from "knex";
import { AppError } from "@/domain/entity/AppError";

export class ProductRepositoryKnex implements ProductRepository {
    knex: Knex;

    constructor() {
        this.knex = knexConnection;
    }

    async persiste(product: Product): Promise<void> {
        await this.knex("product").insert({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.getPrice(),
            fare: product.fare,
            weight: product.dimensions.weight,
            length: product.dimensions.length,
            width: product.dimensions.width,
            height: product.dimensions.height,
        });
    }
    async getById(product_id: string): Promise<Product> {
        const [productData] = await this.knex("product").where({ id: product_id });
        if (!productData) throw new AppError("Product not found");
        const product = Product.create({
            id: productData.id,
            name: productData.name,
            price: parseFloat(productData.price),
            description: productData.description,
            height: productData.height,
            length: productData.length,
            weight: productData.weight,
            width: productData.width,
            fare: productData.fare,
        });

        return product;
    }
    async close(): Promise<void> {
        await this.knex.destroy();
    }
}
