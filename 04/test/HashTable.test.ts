import { HashTable } from "../src/HashTable";

test("Deve criar uma hash a partir de uma key!", function () {
  const hashTable = new HashTable();

  const hash = hashTable.hash("name");

  expect(hash).toBe(417);
});
