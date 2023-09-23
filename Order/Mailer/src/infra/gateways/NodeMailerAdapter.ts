import { MailerGateway } from "@/application/interfaces/MailerGateway";
import nodemailer, { Transporter } from "nodemailer";
import MailerSettings from "./MailerSettings";

export class NodeMailerAdapter implements MailerGateway {
    private transporter: Transporter;
    constructor() {
        this.transporter = nodemailer.createTransport(MailerSettings);
    }
    async send(content: { from: string; to: string; subject: string; body: string; html?: string }): Promise<{
        status: "sended" | "failed";
    }> {
        try {
            await this.transporter.sendMail({
                from: content.from, // sender address
                to: content.to, // list of receivers
                subject: content.subject, // Subject line
                text: content.body, // plain text body
                html: content.html, // html body
            });
            console.log("Message sent: %s");
            return {
                status: "sended",
            };
        } catch (error) {
            return {
                status: "failed",
            };
        }
    }
}
