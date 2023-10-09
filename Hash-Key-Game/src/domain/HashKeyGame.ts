import { Board } from "./Board";

// add comment
// add comment
// add comment
// add comment
export class HashKeyGame {
  readonly board: Board;
  private status: string;
  private lastPlayerPlay: string;
  private winner?: string;

  constructor(readonly playerOne: string, readonly playerTwo: string) {
    this.board = new Board();
    this.lastPlayerPlay = playerOne;
    this.status = `Player ${playerOne} turn`;
  }

  verifyWinner(player: string) {
    if (
      this.board.verifyLinesAndColumns(player) ||
      this.board.verifyDiagonals(player)
    ) {
      return true;
    }

    return false;
  }

  play(line: number, column: number, player: string) {
    if (player === this.lastPlayerPlay) {
      throw new Error(`it's not ${player}'s turn.`);
    }

    if (this.winner) {
      throw new Error(`Player ${this.winner} already won`);
    }

    if (!this.board.validationPlay(line, column)) {
      throw new Error("Invalid position");
    }

    this.status = `Player ${this.lastPlayerPlay} turn`;
    this.lastPlayerPlay = player;
    const icon = player === this.playerOne ? "O" : "X";
    this.board.value[line][column] = { icon, playBy: player };
    if (this.verifyWinner(player)) {
      this.status = `Player ${player} won`;
      this.winner = player;
    }
  }

  getWinner() {
    return this.winner;
  }

  gameStatus() {
    return this.status;
  }
}
