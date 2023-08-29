export class HashTable {
  size: number;
  table: any[];
  constructor(tableSize: number = 128) {
    this.table = new Array(tableSize);
    this.size = 0;
  }

  hash(key: string) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash;
  }
}
