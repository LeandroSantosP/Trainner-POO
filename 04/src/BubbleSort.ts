export class BubbleSort {
  private arr: number[];
  constructor(arr: Array<number>) {
    this.arr = arr;
  }

  sort(order: "asc" | "desc"): number[] {
    //(n)2
    let i, j;
    let len = this.arr.length;

    let isSwapped = false;

    for (i = 0; i < len; i++) {
      isSwapped = false;

      for (j = 0; j < len; j++) {
        if (this.arr[j] > this.arr[j + 1]) {
          let temp = this.arr[j];
          this.arr[j] = this.arr[j + 1];
          this.arr[j + 1] = temp;
          isSwapped = true;
        }
      }

      if (!isSwapped) {
        break;
      }
    }

    return order === "asc" ? this.arr : this.arr.reverse();
  }
}
