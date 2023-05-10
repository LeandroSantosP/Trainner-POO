// /* Composite Patter */

// abstract class ProductContract {
//   abstract getPrice(): number;
//   addProduct(products: ProductContract[]): void {}
//   removeProduct(product: ProductContract): void {}
// }

// class Product extends ProductContract {
//   constructor(public name: string, public price: number) {
//     super();
//   }

//   getPrice(): number {
//     return this.price;
//   }
// }

// class ProductsCompose implements ProductContract {
//   private readonly products: ProductContract[] = [];

//   getPrice(): number {
//     return this.products.reduce(
//       (storage, current) => storage + current.getPrice(),
//       0
//     );
//   }
//   addProduct(products: ProductContract[]): void {
//     products.forEach((product) => this.products.push(product));
//   }
//   removeProduct(product: ProductContract) {
//     const productForRemove = this.products.indexOf(product);
//     if (!productForRemove) return;
//     this.products.slice(productForRemove, 1);
//   }
// }

// const tShirt = new Product("T-Shirt", 20);
// const shoe = new Product("Shoe", 10);
// const pant = new Product("Pant", 30);
// const productsCompose = new ProductsCompose();

// productsCompose.addProduct([tShirt, shoe, pant]);

// console.log(productsCompose.getPrice());

import { randomUUID } from "crypto";
import { MeanDefaultFoodBuilder } from "./Builders/MeanDefaultFoodBuilder";
import { VeganBuilder } from "./Builders/VeganBuilder";

const foodBuilder = new MeanDefaultFoodBuilder();
const foodBuilderVegan = new VeganBuilder();
foodBuilderVegan.veganOne({ RiseID: randomUUID(), SodaID: randomUUID() });

console.log(foodBuilderVegan.getPrice);
const ColaID = randomUUID();
const PepsiID = randomUUID();
const chocolateID = randomUUID();

foodBuilder.makeDrink({ ColaID, PepsiID });

foodBuilder
  .makeDessert(chocolateID)
  .makeDessert(chocolateID)
  .makeDessert(chocolateID);

// console.log(foodBuilder.GetFoodComposeChildren);
// console.log(foodBuilder.GetFoodComposeChildren.getPrice());
