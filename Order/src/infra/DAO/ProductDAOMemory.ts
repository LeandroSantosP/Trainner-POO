import { ProductDAO, ProductDAOType } from "@/application/interfaces/ProductDAO";
import { AppError } from "@/domain/entity/AppError";

export class ProductDAOMemory implements ProductDAO {
    products: ProductDAOType[] = [
        { name: "TV", price: 1300, description: "TV ....", id: "123", fare: 10 },
        { name: "SmartPhone", price: 2000, description: "Smartphone ....", id: "124", fare: 40 },
        { name: "Camisa", price: 25, description: "Camisa ....", id: "125" },
    ];

    async get(productId: string): Promise<ProductDAOType> {
        const product = this.products.find((p) => p.id === productId);
        if (!product) throw new AppError("Product not found");
        return product;
    }
}
