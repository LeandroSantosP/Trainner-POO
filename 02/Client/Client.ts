import { Product } from "../Product/Product";
import { ScheduleCompose } from "../Tasks/ScheduleCompose/ScheduleCompose";
import { TodoLeaf } from "../Tasks/TodoLeaf/TodoLeaf";
import { ClientContract, ClientCredentials } from "./interface/Client";

export class Client implements ClientContract {
  private _clientTasksCompose: ScheduleCompose = new ScheduleCompose();
  private _clientProducts: Product[] = [];
  constructor(
    private id: string,
    private name: string,
    private age: number,
    private cash: number,
    private email?: string
  ) {
    this.createValidation({
      age: this.age,
      clientID: this.id,
      name: this.name,
    });
  }

  set setNewProduct(product: Product) {
    this._clientProducts.push(product);
  }

  createValidation({ age, clientID, name }: ClientCredentials): void | Error {
    if (!age || !clientID || !name) {
      throw new Error("Missing information");
    }
  }

  get UserTasks() {
    return {
      userId: this.id,
      tasks: this._clientTasksCompose.AllTasks,
    };
  }

  registerTasks(...task: TodoLeaf[]): void {
    task.forEach((task) => this._clientTasksCompose.create(task));
  }

  get getCredentials() {
    return {
      id: this.id,
      name: this.name,
      age: this.age,
      email: this.email,
      cash: this.cash,
    };
  }

  addCash(
    number: number,
    callback?: (currentCash: number) => string | void
  ): string | undefined {
    this.cash += number;
    if (callback) {
      const CashFormat = callback(this.cash);
      if (!CashFormat) {
        return;
      }
      return CashFormat;
    }
  }

  removeCash(
    amount: number,
    callback?: (currentCash: number) => string | void
  ): void | Error | string {
    if (this.cash < amount) {
      throw new Error("Insufficient funds");
    }
    this.cash -= amount;
    if (callback) {
      const CashFormat = callback(this.cash);
      if (!CashFormat) {
        return;
      }
      return CashFormat;
    }
  }
}
