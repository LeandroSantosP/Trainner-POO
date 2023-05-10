import { TodoLeaf } from "../TodoLeaf/TodoLeaf";

export abstract class TodoContract {
  create(...todos: TodoLeaf[]): void {}
  remove(todo: string): void {}
}
