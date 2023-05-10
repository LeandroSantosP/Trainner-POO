export abstract class FoodBuildContract {
  abstract remove(...foodId: string[]): this;
}
