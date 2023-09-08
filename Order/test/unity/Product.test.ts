import { Product } from "@/domain/entity/Product";

test("Deve ser possível criar um product e obter o preço.", function () {
    const product = Product.create({
        name: "TV",
        description: "... Uma descrição",
        price: 1000,
        width: 30,
        height: 20,
        length: 20,
        weight: 3,
    });

    expect(product).toBeDefined();
});
