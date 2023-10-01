import { Client } from "@/domain/Client";

async function createClient(input?: CreateClientInput) {
    return await Client.create({
        name: input?.name || "John Doe",
        age: input?.age || 23,
        email: input?.email || "john.doe@email.com",
        password: input?.password || "senha1223324",
        cpf: input?.cpf || "99537828654",
    });
}

type CreateClientInput = {
    name?: string;
    age?: number;
    email?: string;
    password?: string;
    cpf?: string;
};

test("Deve criar um novo client", async function () {
    const client = await createClient();

    expect(client).toBeDefined();

    expect(client.email.getValue()).toBe("john.doe@email.com");
    expect(client.cpf.getValue()).toBe("99537828654");
});

test("Nao deve criar um cliente com email invalido", async function () {
    await expect(() => createClient({ email: "john.doe@email" })).rejects.toThrow(new Error("Invalid email"));
});

test("Nao deve criar um cliente com cpf invalido", async function () {
    await expect(() => createClient({ cpf: "995378286" })).rejects.toThrow(new Error("Invalid Document"));
});

test("Nao deve criar um cliente com menos de 18 anos", async function () {
    await expect(() => createClient({ age: 17 })).rejects.toThrow(new Error("Client must be at least 18 years old"));
});

test("Nao deve criar um cliente senha fraca.", async function () {
    await expect(() => createClient({ password: "XXXX" })).rejects.toThrow(new Error("Password is too weak"));
});

test("Deve ser possível criptografar uma senha e obter o hash dela.", async function () {
    const client = await createClient();
    expect(client).toBeDefined();
    expect(client.password.getValue()).not.toBe("senha1223324");
});
