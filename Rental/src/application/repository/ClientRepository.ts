import { Client } from "@/domain/Client";

export interface ClientRepository {
    persiste(client: Client): Promise<void>;
    get(client_id: string): Promise<Client>;
    getByEmail(email: string): Promise<Client | null>;
    update(client: Client): Promise<void>;
}
