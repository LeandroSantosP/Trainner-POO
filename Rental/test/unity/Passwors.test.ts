import { Password } from "@/domain/Password";

test("Deve ser possível criptografar uma senha e obter o hash dela.", async function () {
    const pass = await Password.create("senha12345");
    expect(pass.getValue()).not.toBe("senha1223324");
});

test("Deve ser verificar se uma senha e valida.", async function () {
    const pass = await Password.create("senha12345");
    expect(await pass.isValid("senha12345")).toBeTruthy();
    expect(await pass.isValid("senha123456")).toBeFalsy();
});
