export abstract class FoodContract {
  abstract getPrice(): number;
  abstract id: string;

  addFood(...food: FoodContract[]): void {}
  removeFood(foodId: string): void {}
}
