import { Product } from "@/domain/entity/Product";

test("Deve ser possível criar um produto", function () {
    const product = new Product("SmartPhone", 10, 2000, "Galaxy .....");
    expect(product.description).toBe("Galaxy .....");
    expect(product.price).toBe(2000);
    expect(product.name).toBe("SmartPhone");
});

test("Deve ser possível criar um produto e calcular o subtotal", function () {
    const product = new Product("SmartPhone", 10, 2000, "Galaxy .....");
    expect(product.getSubtotal()).toBe(20000);
});

test("Deve não deve ser possível criar um produto com quantidade negativa", function () {
    expect(() => new Product("SmartPhone", -10, 2000, "Galaxy .....")).toThrow(
        new Error("Product quantity must not be negative")
    );
});
