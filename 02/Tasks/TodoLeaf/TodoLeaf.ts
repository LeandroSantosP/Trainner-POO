import { TodoContract } from "../interfaces/TodoContract";

export class TodoLeaf implements TodoContract {
  constructor(private readonly _id: string, private readonly text: string) {}

  get GetId(): string {
    return this._id;
  }

  create(...todos: TodoLeaf[]): void {}
  remove(todo: string): void {}
}
