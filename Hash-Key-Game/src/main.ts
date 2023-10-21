import { Elysia } from "elysia";
import { Board } from "@/domain/Board";

const app = new Elysia();

app.get("/board", () => {
  new Board().printBoard();
  return "Leandro";
});
app.listen(3000);
// testing

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
