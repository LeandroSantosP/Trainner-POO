import { HashTable } from "../src/HashTable";

test("Deve criar uma hash a partir de uma key!", function () {
  const hashTable = new HashTable(100);

  const hash = hashTable._hash("name");

  expect(hash).toBe(17);
  expect(hash).toBeLessThan(100);
  expect(hash).toBeGreaterThan(0);
});

test("Deve setar um item na hashTable utilizando o metade set e obtelo utilizando o metado get.", function () {
  const hashTable = new HashTable(100);

  hashTable.set("name", "johnDoe");

  const item = hashTable.get("name");
  const item2 = hashTable.get("invalid");

  expect(item2).toBeUndefined();
  expect(item).toBe("johnDoe");
  expect(hashTable.size).toBe(1);
});

test("Deve setar um item na hashTable utilizando o metade set e remove-lo utilizando o metade remove.", function () {
  const hashTable = new HashTable(100);

  hashTable.set("name", "johnDoe");
  const itemAfter = hashTable.get("name");
  expect(hashTable.size).toBe(1);
  expect(itemAfter).toBe("johnDoe");
  hashTable.remove("name");
  const itemBefore = hashTable.get("name");
  expect(itemBefore).toBeUndefined();
  expect(hashTable.size).toBe(0);
});
