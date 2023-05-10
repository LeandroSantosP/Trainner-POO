export interface updateInput {
  id: string;
  price: number;
}

export enum ProductCategory {
  FOOD = "food",
  DRINK = "drink",
  ELECTRONICS = "electronics",
}

export abstract class ProductContract {
  abstract updatedPrice(params: updateInput): void | Error;
  abstract setProductsCategory(...params: ProductCategory[]): void | Error;
}
