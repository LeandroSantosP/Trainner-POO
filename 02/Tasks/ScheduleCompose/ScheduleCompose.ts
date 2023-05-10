import { TodoContract } from "../interfaces/TodoContract";
import { TodoLeaf } from "../TodoLeaf/TodoLeaf";

export class ScheduleCompose implements TodoContract {
  private readonly _TodoList: TodoLeaf[] = [];

  create(...todos: TodoLeaf[]): void {
    for (const todo of todos) {
      this._TodoList.push(todo);
    }
  }
  remove(todoId: string): void {
    this._TodoList.find((todo) => todo.GetId === todoId);
    return;
  }

  get AllTasks() {
    return this._TodoList;
  }
}
