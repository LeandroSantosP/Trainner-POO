import "dotenv/config";

export default {
    host: process.env.MAILER_HOST,
    port: Number(process.env.MAILER_PORT),
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
    },
};
