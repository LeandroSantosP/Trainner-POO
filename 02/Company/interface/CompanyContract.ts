import { Client } from "../../Client/Client";

export interface sellingInput {
  clientId: string;
  productId: string[];
}

export abstract class CompanyContract {
  abstract RegisterClient(Client: Client): void;
  abstract selling(params: sellingInput): boolean;
}
