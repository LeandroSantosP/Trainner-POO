import { ProductRepository } from "@/application/repository/ProductRepository";
import { Product } from "@/domain/entity/Product";
export class ProductRepositoryMemory implements ProductRepository {
    products: Product[] = [
        Product.create({
            name: "TV",
            price: 1300,
            description: "TV ....",
            id: "123",
            height: 20,
            length: 20,
            weight: 3,
            width: 30,
            fare: 10,
        }),
        Product.create({
            name: "SmartPhone",
            price: 2000,
            description: "Smartphone ....",
            id: "124",
            height: 20,
            length: 20,
            weight: 3,
            width: 30,
            fare: 40,
        }),
        Product.create({
            name: "Camisa",
            price: 25,
            description: "Camisa ....",
            id: "125",
            height: 20,
            length: 20,
            weight: 3,
            width: 30,
        }),
    ];

    static instance: ProductRepositoryMemory;

    static getInstance() {
        if (!ProductRepositoryMemory.instance) {
            ProductRepositoryMemory.instance = new ProductRepositoryMemory();
        }
        return ProductRepositoryMemory.instance;
    }
    async getById(product_id: string): Promise<Product> {
        const product = this.products.find((prod) => prod.id === product_id);
        if (!product) throw new Error("Product not found");
        return product;
    }
    async persiste(product: Product): Promise<void> {
        this.products.push(product);
    }
}
