import { ClientRepository } from "@/application/repository/ClientRepository";
import { Client } from "@/domain/Client";

export class ClientRepositoryMemory implements ClientRepository {
    clients: Client[] = [];
    async persiste(client: Client): Promise<void> {
        this.clients.push(client);
    }
    async get(client_id: string): Promise<Client> {
        const client = this.clients.find((client) => client.id === client_id);
        if (!client) {
            throw new Error("Client not found");
        }
        return client;
    }
    async getByEmail(email: string): Promise<Client | null> {
        const client = this.clients.find((client) => client.email.getValue() === email);
        return client || null;
    }
    async update(clientUpdate: Client): Promise<void> {
        const client = this.clients.find((client) => client.id === clientUpdate.id);
        if (!client) {
            throw new Error("Client not found");
        }
        this.clients.splice(this.clients.indexOf(client), 1, clientUpdate);
    }
}
