import { TodoLeaf } from "../../Tasks/TodoLeaf/TodoLeaf";

export interface ClientCredentials {
  clientID: string;
  name: string;
  age: number;
  email?: string;
}

export abstract class ClientContract {
  abstract createValidation(params: ClientCredentials): void | Error;
  abstract registerTasks(...task: TodoLeaf[]): void;
  abstract addCash(
    number: number,
    callback: (currentCash: number) => string | void
  ): string | void;
}
