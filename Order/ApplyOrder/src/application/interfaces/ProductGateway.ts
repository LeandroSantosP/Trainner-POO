export interface ProductGateWay {
    getProducts(productsIds: string[]): Promise<Output>;
}

export type Output = {
    productId: string;
    price: number;
    name: string;
    weight: number;
    density: number;
    volume: number;
    fare?: number | undefined;
}[];
