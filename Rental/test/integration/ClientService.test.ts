import { ClientService } from "@/application/services/ClientService";
import { ClientRepositoryMemory } from "@/infra/repository/ClientRepositoryMemory";

test("Deve ser possível criar um usuário valido", async function () {
    const clientRepository = new ClientRepositoryMemory();
    const clientService = new ClientService(clientRepository);

    const input = {
        email: "john.doe@gmail.com",
        password: "senha123123",
        name: "John Doe",
        age: 22,
        cpf: "99537828654",
    };

    await clientService.create(input);

    const output = await clientRepository.getByEmail("john.doe@gmail.com");

    expect(output?.email.getValue()).toBe(input.email);
    expect(output?.name).toBe(input.name);
    expect(output?.age).toBe(input.age);
    expect(output?.cpf.getValue()).toBe(input.cpf);
});
