export interface ProductDAO {
    get(productId: string): Promise<ProductDAOType>;
}

export type ProductDAOType = {
    name: string;
    price: number;
    description: string;
    fare?: number;
    id: string;
};
