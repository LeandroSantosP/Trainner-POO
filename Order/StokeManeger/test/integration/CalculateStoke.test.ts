import { StokeEntryRepository } from "@/application/repository/StokeEntryRepository";
import { StokeService } from "@/application/services/StokeService";
import { AppError } from "@/domain/entity/AppError";
import knexConnection from "@/infra/database/knexfile";
import { StokeEntryRepositoryKnex } from "@/infra/repository/StokeEntryRepository";
import clear from "knex-cleaner";
let stokeEntryRepository: StokeEntryRepository;

beforeEach(async function () {
    await clear.clean(knexConnection, {
        ignoreTables: ["product", "order", "coupon", "order_line"],
    });
    stokeEntryRepository = new StokeEntryRepositoryKnex();
    await stokeEntryRepository.clean();
});
test("Deve ser possível calcular o total de um stoke de um produto", async function () {
    const stokeService = new StokeService(stokeEntryRepository);
    const output = await stokeService.calculateStoke("a3ff22d2-4e54-4db4-ae87-9e739f578009");
    expect(output.total).toBe(0);
});

test("Deve ser possível calcular o total adicionando items ao stoke", async function () {
    const stokeService = new StokeService(stokeEntryRepository);
    const input1 = {
        items: [{ productId: "a3ff22d2-4e54-4db4-ae87-9e739f578009", quantity: 10 }],
    };
    await stokeService.increaseStoke(input1);
    const output = await stokeService.calculateStoke("a3ff22d2-4e54-4db4-ae87-9e739f578009");
    expect(output.total).toBe(10);
});

test("Deve ser possível calcular o total adicionando e removendo items do stoke", async function () {
    const stokeService = new StokeService(stokeEntryRepository);
    const input1 = {
        items: [{ productId: "a3ff22d2-4e54-4db4-ae87-9e739f578009", quantity: 10 }],
    };

    const input2 = {
        items: [{ productId: "a3ff22d2-4e54-4db4-ae87-9e739f578009", quantity: 4 }],
    };
    await stokeService.increaseStoke(input1);
    await stokeService.decreaseStoke(input2);
    const output = await stokeService.calculateStoke("a3ff22d2-4e54-4db4-ae87-9e739f578009");
    expect(output.total).toBe(6);
});

test.skip("Nao deve ser possível remover product que esta com stoke zerado", async function () {
    const stokeService = new StokeService(stokeEntryRepository);
    const input = {
        items: [{ productId: "a3ff22d2-4e54-4db4-ae87-9e739f578009", quantity: 4 }],
    };
    await expect(() => stokeService.decreaseStoke(input)).rejects.toThrow(
        new AppError("It's not possible decrease a negative quantity of stoke.")
    );
});
