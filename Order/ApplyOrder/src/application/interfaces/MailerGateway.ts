export interface MailerGateway {
    send(content: { from: string; to: string; subject: string; body: string; html?: string }): Promise<Output>;
}

type Output = {
    status: "sended" | "failed";
};
