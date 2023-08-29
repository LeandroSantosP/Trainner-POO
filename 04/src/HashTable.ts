class Table {
  private value: string;
  constructor(value: string) {
    this.value = value;
  }
  getValue() {
    return this.value;
  }
}
export class HashTable {
  size: number;
  table: Table[];
  constructor(tableSize: number = 128) {
    this.table = new Array(tableSize);
    this.size = 0;
  }
  _hash(key: string) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.table.length;
  }
  set(key: string, value: string): void {
    const hashIndex = this._hash(key);
    this.table[hashIndex] = new Table(value);
    this.size++;
  }
  get(key: string) {
    const index = this._hash(key);
    if (!this.table[index]) return;
    return this.table[index].getValue();
  }
}
