import { HashKeyGame } from "@/domain/HashKeyGame";

test("Deve ser possível criar um jogo da velha com um tabuleiro em branco", function () {
  const hashKeyGame = new HashKeyGame("João", "Maria");
  hashKeyGame.board.printBoard();

  expect(hashKeyGame.gameStatus()).toBe("Player João turn");
  expect(hashKeyGame.board.value).toHaveLength(3);
  hashKeyGame.board.value.forEach((line) => {
    expect(line).toHaveLength(3);
    expect(line[0]).toEqual({ icon: "", playBy: null });
    expect(line[1]).toEqual({ icon: "", playBy: null });
    expect(line[2]).toEqual({ icon: "", playBy: null });
  });
});

test("Deve ser possível jogar um turno", function () {
  const hashKeyGame = new HashKeyGame("João", "Maria");
  hashKeyGame.play(2, 1, "Maria");
  hashKeyGame.board.printBoard();
  expect(hashKeyGame.board.value[2][1]).toEqual({ icon: "X", playBy: "Maria" });
  expect(hashKeyGame.gameStatus()).toBe("Player João turn");
});

test("Nao deve ser possível um mesmo jogador jogar fora da sua vez", function () {
  const hashKeyGame = new HashKeyGame("João", "Maria");
  hashKeyGame.play(1, 2, "Maria");
  hashKeyGame.board.printBoard();

  expect(() => hashKeyGame.play(1, 2, "Maria")).toThrow(
    new Error("it's not Maria's turn.")
  );
});

test("Deve possível jogar em uma possível ja marcada.", function () {
  const hashKeyGame = new HashKeyGame("João", "Maria");
  hashKeyGame.play(1, 2, "Maria");
  expect(() => hashKeyGame.play(1, 2, "João")).toThrow(
    new Error("Invalid position")
  );
});

test("Deve Ser possível ganhar uma partida.", function () {
  const hashKeyGame = new HashKeyGame("João", "Maria");
  hashKeyGame.play(1, 2, "Maria");
  hashKeyGame.play(0, 1, "João");
  hashKeyGame.play(0, 2, "Maria");
  hashKeyGame.play(2, 2, "João");
  hashKeyGame.play(1, 1, "Maria");
  hashKeyGame.play(0, 0, "João");
  hashKeyGame.play(2, 0, "Maria");
  hashKeyGame.board.printBoard();
  expect(hashKeyGame.gameStatus()).toBe("Player Maria won");
  expect(hashKeyGame.getWinner()).toBe("Maria");
  expect(() => hashKeyGame.play(2, 1, "João")).toThrow(
    new Error("Player Maria already won")
  );
});
