import { Message } from "@/domain/entity/Message";

test("Deve ser possível criar uma message", function () {
    const message = new Message("123", "test@gmail.com", "test@gmail.com", "", "");

    expect(message).toBeDefined();
    expect(message.getId()).toBe("123");
});
