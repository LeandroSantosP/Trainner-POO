export interface MailerGateway {
    send(content: { from: string; to: string; subject: string; body: string }): Promise<void>;
}
