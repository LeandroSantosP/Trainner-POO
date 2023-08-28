export interface Mailer {
    sendMailer(input: SendMailerInput): Promise<SendMailerOutPut>;
}

export type SendMailerInput = {
    from: string;
    to: string;
    subject: string;
    message: string;
};
export type SendMailerOutPut = {
    status: string;
};
