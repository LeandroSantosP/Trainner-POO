import { randomUUID } from "crypto";
import { FoodCompose } from "../FoodCompose/FoodCompose";
import { Desert, Meat, Milk, Rise, Soda } from "../FoodLeaf/FoodLeaf";
import { FoodBuildContract } from "../interfaces/food-builder-contract";
import { FoodContract } from "../interfaces/food-contract";

export interface makeDrinkInput {
  ColaID: string;
  PepsiID: string;
}

export enum ableFoodTypes {
  Milk = "Milk",
  Meat = "Meat",
  Rise = "Rise",
  Desert = "Desert",
  Soda = "Soda",
}

export class MeanDefaultFoodBuilder implements FoodBuildContract {
  private _children: FoodCompose = new FoodCompose();

  constructor() {
    this._children = new FoodCompose();
  }

  remove(...foodId: string[]): this {
    foodId.forEach((foodIDCurr) => this._children.removeFood(foodIDCurr));
    return this;
  }

  makeDefaultFood(): this {
    this._children.defaultMealRiseWithIceCream();
    return this;
  }

  reset(): void {
    this._children = new FoodCompose();
  }

  makeCustomFood(
    name: string,
    price: number,
    type: ableFoodTypes
  ): this | boolean {
    if (!name || !price || !type) {
      return false;
    }
    let foodsForAdded: FoodContract[] = [];

    if (type === ableFoodTypes.Milk) {
      const milk = new Milk(name, price, randomUUID());
      foodsForAdded.push(milk);
    } else if (type === ableFoodTypes.Meat) {
      const meat = new Meat(name, price, randomUUID());
      foodsForAdded.push(meat);
    } else if (type === ableFoodTypes.Desert) {
      const desert = new Desert(name, price, randomUUID());
      foodsForAdded.push(desert);
    } else if (type === ableFoodTypes.Rise) {
      const rise = new Rise(name, price, randomUUID());
      foodsForAdded.push(rise);
    } else if (type === ableFoodTypes.Soda) {
      const meat = new Soda(name, price, randomUUID());
      foodsForAdded.push(meat);
    } else {
      return false;
    }

    if (foodsForAdded.length > 0) {
      this._children.addFood(...foodsForAdded);
    }

    return this;
  }
  makeDrink({ ColaID, PepsiID }: makeDrinkInput): this {
    const Cola = new Soda("Cola", 5, ColaID);
    const Pepsi = new Soda("Pepsi", 5, PepsiID);
    this._children.addFood(Cola, Pepsi);
    return this;
  }

  makeDessert(chocolateID: string): this {
    const chocolate = new Desert("chocolate", 25, chocolateID);
    this._children.addFood(chocolate);
    return this;
  }

  get GetFoodComposeChildren(): FoodCompose {
    return this._children;
  }
}
