import { randomUUID } from "crypto";
import { Client } from "./Client/Client";
import { Company } from "./Company/Company";
import { ProductCategory } from "./Product/interface/ProductContract";
import { Product } from "./Product/Product";
import { TodoLeaf } from "./Tasks/TodoLeaf/TodoLeaf";

const idOne = randomUUID();
const idTwo = randomUUID();
const idThree = randomUUID();

const taskOne = new TodoLeaf(idOne, "Task One");
const taskTwo = new TodoLeaf(idTwo, "Task Two");
const taskThree = new TodoLeaf(idThree, "Task Three");

const leandroId = randomUUID();
const newClient = new Client(
  leandroId,
  "leandro",
  21,
  200,
  "leandro@gmail.com"
);
newClient.registerTasks(taskOne, taskTwo, taskThree);

const company = new Company("SPS", "leandro");
const shoesID = randomUUID();
const bikeID = randomUUID();

const shoes = new Product(shoesID, "Shoes", 20);
const bike = new Product(bikeID, "Bike", 20);
shoes.setProductsCategory(ProductCategory.DRINK);

company.RegisterProduct(shoes, bike);
company.RegisterClient(newClient);

const res = company.selling({
  clientId: newClient.getCredentials.id,
  productId: [shoesID],
});

const infos = company.balense;
console.log(infos);
