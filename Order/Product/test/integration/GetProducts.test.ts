import { ProductService } from "@/application/services/ProductService";
import { ProductRepositoryKnex } from "@/infra/repository/ProductRepositoryKnex";
import knexConnection from "@/infra/database/knexfile";
import { ProductRepositoryMemory } from "@/infra/repository/ProductRepositoryMemory";

test("Deve ser possível buscar uma lista de produtos", async function () {
    const productRepository = new ProductRepositoryKnex();
    const productService = new ProductService(productRepository);
    const input = {
        productIds: [
            "e0907ecf-3b90-4bbf-b741-ad3da998b59e",
            "3faccc5e-ab42-405e-b75e-45fba9c920cd",
            "3faccc5e-ab42-405e-b75e-45fba9c920cd",
        ],
    };
    const output = await productService.getProducts(input);
    expect(output.products).toHaveLength(3);
    await productRepository.close();
});
