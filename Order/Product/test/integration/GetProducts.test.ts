import { ProductService } from "@/application/services/ProductService";
import knexConnection from "@/infra/database/knexfile";
import { ProductRepositoryMemory } from "@/infra/repository/ProductRepositoryMemory";
import knexClean from "knex-cleaner";

beforeEach(async () => {
    await knexClean.clean(knexConnection);
});

test("Deve ser possível buscar uma lista de produtos", async function () {
    const productRepository = new ProductRepositoryMemory();
    const productService = new ProductService(productRepository);
    const input = { productIds: ["123", "124", "125"] };
    const output = await productService.getProducts(input);
    expect(output.products).toHaveLength(3);
    await productRepository.close();
});
