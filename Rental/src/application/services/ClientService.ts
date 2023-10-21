import { ClientRepository } from "@/application/repository/ClientRepository";
import { Client } from "@/domain/Client";

export class ClientService {
    constructor(readonly clientRepository: ClientRepository) {}

    async create(input: CreateClientInput): Promise<void> {
        const clientExists = await this.clientRepository.getByEmail(input.email);
        if (clientExists) {
            throw new Error("Client already exists");
        }
        const client = await Client.create({
            ...input,
        });
        await this.clientRepository.persiste(client);
    }
}

type CreateClientInput = {
    name: string;
    email: string;
    cpf: string;
    password: string;
    age: number;
};
