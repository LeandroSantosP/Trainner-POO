export class Rgb {
  constructor(
    readonly red: number,
    readonly green: number,
    readonly blue: number
  ) {
    if (!this.isValidColorCode(red, green, blue)) {
      throw new Error("Invalid Color");
    }
  }

  private isValidColorCode(...codes: number[]) {
    for (const code of codes) {
      if (code < 0 || code > 255) return false;
    }
    return true;
  }

  getColorCode(color: keyof Omit<this, "getColorCode">) {
    return this[color];
  }
}
