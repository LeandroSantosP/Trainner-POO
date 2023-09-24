import { AppError } from "@/domain/entity/AppError";
import { Email } from "@/domain/entity/Email";

test("Deve ser possível criar um email", function () {
    const email = new Email("test@email.com");
    expect(email.getValue()).toBe("test@email.com");
});

test("Nao Deve ser possível criar um email invalido", function () {
    expect(() => new Email("test@email")).toThrow(new AppError("Invalid email!"));
});
