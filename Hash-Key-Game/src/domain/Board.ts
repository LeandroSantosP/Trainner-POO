export class Board {
  value: Array<{ playBy: string | null; icon: string }[]>;

  constructor() {
    this.value = this.generateBoard();
  }
  resetBoard() {
    this.value = [];
  }
  generateBoard() {
    let board: Array<{ playBy: string | null; icon: string }[]> = [];
    for (let i = 0; i < 3; i++) {
      board[i] = [];
      for (let j = 0; j < 3; j++) {
        board[i][j] = { playBy: null, icon: "" };
      }
    }
    return board;
  }

  verifyLinesAndColumns(player: string) {
    for (let i = 0; i < 3; i++) {
      if (
        this.value[i][0].playBy === player &&
        this.value[i][1].playBy === player &&
        this.value[i][2].playBy === player
      ) {
        return true;
      }
      if (
        this.value[0][i].playBy === player &&
        this.value[1][i].playBy === player &&
        this.value[2][i].playBy === player
      ) {
        return true;
      }
    }
  }

  verifyDiagonals(player: string) {
    if (
      this.value[0][0].playBy === player &&
      this.value[1][1].playBy === player &&
      this.value[2][2].playBy === player
    ) {
      return true;
    }
    if (
      this.value[0][2].playBy === player &&
      this.value[1][1].playBy === player &&
      this.value[2][0].playBy === player
    ) {
      return true;
    }
  }

  printBoard() {
    console.log("  0 1 2");
    for (let i = 0; i < 3; i++) {
      let linha = `${i} `;
      for (let j = 0; j < 3; j++) {
        if (this.value[i][j].playBy === null) {
          linha += "| - ";
        } else {
          linha += `| ${this.value[i][j].playBy} `;
        }
      }
      linha += "|";
      console.log(linha);
      console.log("  ---------");
    }
  }

  private isValidLine(line: number) {
    return line >= 0 && line < 3;
  }
  private isValidColumn(column: number) {
    return column >= 0 && column < 3;
  }

  private isValidPosition(line: number, column: number) {
    return (
      this.value[line][column].playBy === null &&
      this.value[line][column].icon === ""
    );
  }
  validationPlay(line: number, column: number) {
    return (
      this.isValidLine(line) &&
      this.isValidColumn(column) &&
      this.isValidPosition(line, column)
    );
  }
}
