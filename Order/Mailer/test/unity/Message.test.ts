import { MessageBuilder } from "@/domain/builder/MessageBuilder";
import { AppError } from "@/domain/entity/AppError";

test("Deve ser possível criar uma message", function () {
    const message = new MessageBuilder()
        .addFrom("test1@gmail.com")
        .addTo("test@gmail.com")
        .addId("123")
        .addSubject("Subject")
        .addBody(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa."
        )
        .build();

    expect(message).toBeDefined();
    expect(message.getId()).toBe("123");
});

test("Deve o body da message conter no mínimo 30 caractere", function () {
    const builder = new MessageBuilder()
        .addFrom("test1@gmail.com")
        .addTo("test@gmail.com")
        .addId("123")
        .addSubject("Subject")
        .addBody("short body");

    expect(() => builder.build()).toThrow(new AppError("Message body is too short must be greater than 30 caractere"));
});
