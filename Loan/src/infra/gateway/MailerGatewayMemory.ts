import { Mailer, SendMailerInput, SendMailerOutPut } from "@/application/interfaces/Mailer";

export class MailerGatewayMemory implements Mailer {
    async sendMailer(input: SendMailerInput): Promise<SendMailerOutPut> {
        return {
            status: "sended",
        };
    }
}
