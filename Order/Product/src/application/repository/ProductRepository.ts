import { Product } from "@/domain/entity/Product";

export interface ProductRepository {
    persiste(product: Product): Promise<void>;
    getById(product_id: string): Promise<Product>;
    close(): Promise<void>;
}
