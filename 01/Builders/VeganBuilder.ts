import { FoodCompose } from "../FoodCompose/FoodCompose";
import { Rise, Soda } from "../FoodLeaf/FoodLeaf";
import { FoodBuildContract } from "../interfaces/food-builder-contract";

export enum ableFoodTypes {
  Milk = "Milk",
  Meat = "Meat",
  Rise = "Rise",
  Desert = "Desert",
  Soda = "Soda",
}

export class VeganBuilder implements FoodBuildContract {
  private _children: FoodCompose = new FoodCompose();

  constructor() {
    this._children = new FoodCompose();
  }

  remove(...foodId: string[]): this {
    foodId.forEach((foodIDCurr) => this._children.removeFood(foodIDCurr));
    return this;
  }

  veganOne({ RiseID, SodaID }: { RiseID: string; SodaID: string }) {
    const Cola = new Rise("Rise", 5, RiseID);
    const Pepsi = new Soda("Cola", 5, SodaID);
    this._children.addFood(Cola, Pepsi);

    return this;
  }

  reset(): void {
    this._children = new FoodCompose();
  }

  get getPrice(): number {
    return this._children.getPrice();
  }

  get GetFoodComposeChildren(): FoodCompose {
    return this._children;
  }
}
