import { ProductWithFare } from "@/domain/entity/ProductWithFare";

test("Deve ser passível criar um produto e calcular o imposto", function () {
    const product = new ProductWithFare("TV", 10, 1000, "TV .....");
    const fare = product.calculateFare();
    expect(fare).toBe(200);
});

test("Deve ser passível criar um produto e calcular o imposto com uma taxa custom", function () {
    const product = new ProductWithFare("TV", 10, 1000, "TV .....", 3);
    const fare = product.calculateFare();
    expect(fare).toBe(300);
});

test("Deve aplicar o imposto mínimo de 10", function () {
    const product = new ProductWithFare("TV", 1, 100, "TV .....");
    const fare = product.calculateFare();
    expect(fare).toBe(10);
});
