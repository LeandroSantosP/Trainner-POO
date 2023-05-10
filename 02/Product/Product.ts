import {
  updateInput,
  ProductContract,
  ProductCategory,
} from "./interface/ProductContract";

export class Product implements ProductContract {
  private _category: ProductCategory[] = [];

  constructor(
    private _id: string,
    private _name: string,
    private _price: number
  ) {}

  setProductsCategory(...params: ProductCategory[]): void | Error {
    for (const category of params) {
      const categoryAvailable = [
        ProductCategory.DRINK,
        ProductCategory.ELECTRONICS,
        ProductCategory.FOOD,
      ];
      if (!categoryAvailable.includes(category)) {
        throw new Error("Invalid category");
      }
    }
    params.forEach((category) => this._category.push(category));
  }

  updatedPrice({ id, price }: updateInput): void | Error {
    if (this._id !== id) {
      throw new Error("Invalid ID");
    }
    this._price = price;
  }

  get getProductInfos() {
    return {
      id: this._id,
      name: this._name,
      price: this._price,
      category: this._category,
    };
  }
}
