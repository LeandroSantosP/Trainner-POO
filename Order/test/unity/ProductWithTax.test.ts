import { ProductWithFare } from "@/domain/ProductWithFare";

test("Deve ser passível criar um produto e calcular o imposto", function () {
    const product = new ProductWithFare("TV", 10, 1000);
    const fare = product.calculateFare();
    expect(fare).toBe(20);
});

test("Deve ser passível criar um produto e calcular o imposto com uma taxa custom", function () {
    const product = new ProductWithFare("TV", 10, 1000);
    const fare = product.calculateFare(3);
    expect(fare).toBe(30);
});
