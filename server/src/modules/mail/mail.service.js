import nodemailer from "nodemailer";
import env from "../../config/env.js";

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: env.MAIL_HOST,
            port: env.MAIL_PORT,
            auth: {
                user: env.MAIL_USER,
                pass: env.MAIL_PASS
            }
        });
    }

    async sendMagicLink(email, link) {
        try {
            const info = await this.transporter.sendMail({
                from: '"Qrazy Auth" <auth@qrazy.com>',
                to: email,
                subject: "Sign in to Qrazy",
                text: `Click this link to sign in: ${link}`,
                html: `<p>Click this link to sign in:</p><a href="${link}">${link}</a>`,
            });

            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        } catch (error) {
            console.error("Error sending email:", error);
        }
    }
}

export default new MailService();
