import { randomUUID } from "crypto";
import { Email } from "./Email";
import { Cpf } from "./Document";
import { Password } from "./Password";

export class Client {
    readonly email: Email;
    readonly cpf: Cpf;
    private constructor(
        readonly id: string,
        readonly name: string,
        readonly age: number,
        readonly password: Password,
        email: string,
        cpf: string
    ) {
        if (age < 18) throw new Error("Client must be at least 18 years old");
        this.email = new Email(email);
        this.cpf = new Cpf(cpf);
    }

    static async create(input: Input) {
        const password = await Password.create(input.password);
        return new Client(input.id ?? randomUUID(), input.name, input.age, password, input.email, input.cpf);
    }
}

type Input = {
    id?: string;
    name: string;
    email: string;
    cpf: string;
    password: string;
    age: number;
};
