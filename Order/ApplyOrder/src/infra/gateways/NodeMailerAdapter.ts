import { MailerGateway } from "@/application/interfaces/MailerGateway";

export class NodeMailerAdapter implements MailerGateway {
    send(content: { from: string; to: string; subject: string; body: string }): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
