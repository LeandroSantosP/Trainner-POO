import { randomUUID } from "crypto";
import { Desert, Rise } from "../FoodLeaf/FoodLeaf";
import { FoodContract } from "../interfaces/food-contract";

export class FoodCompose extends FoodContract {
  id: string = randomUUID();

  private readonly _children: FoodContract[] = [];

  defaultMealRiseWithIceCream() {
    [
      new Rise("Arroz", 21, randomUUID()),
      new Desert("Sorvete", 10, randomUUID()),
    ].forEach((food) => this._children.push(food));
  }

  getPrice(): number {
    let totalPrice = 0;
    for (const product of this._children) {
      totalPrice += product.getPrice();
    }
    return totalPrice;
  }
  addFood(...foods: FoodContract[]): void {
    for (const product of foods) {
      this._children.push(product);
    }
  }
  removeFood(foodId: string): void {
    const foodFiltered = this._children.find((food) => food.id === foodId);
    if (foodFiltered) {
      this._children.splice(this._children.indexOf(foodFiltered), 1);
    }
  }
}
