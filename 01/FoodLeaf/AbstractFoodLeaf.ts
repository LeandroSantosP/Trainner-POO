import { FoodContract } from "../interfaces/food-contract";

export abstract class AbstractFoodLeaf extends FoodContract {
  constructor(
    private readonly name: string,
    private readonly price: number,
    public readonly id: string
  ) {
    super();
  }
  getPrice(): number {
    return this.price;
  }
}
