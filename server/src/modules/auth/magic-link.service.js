import crypto from "crypto";
import bcrypt from "bcrypt";
import prisma from "../../config/prisma.js";
import mailService from "../mail/mail.service.js";
import env from "../../config/env.js";

class MagicLinkService {
    async requestLink(email) {
        const token = crypto.randomBytes(32).toString("hex");
        const tokenHash = await bcrypt.hash(token, 10);

        const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

        await prisma.magicLink.create({
            data: {
                email,
                tokenHash,
                expiresAt,
            },
        });

        const frontendUrl = env.FRONTEND_URL;
        const link = `${frontendUrl}/verify-magic-link?email=${encodeURIComponent(email)}&token=${token}`;

        await mailService.sendMagicLink(email, link);

        return { message: "Magic link sent" };
    }

    async verifyLink(email, token) {
        const record = await prisma.magicLink.findFirst({
            where: {
                email,
                used: false,
                expiresAt: { gt: new Date() },
            },
            orderBy: { createdAt: "desc" },
        });

        if (!record) {
            throw new Error("Invalid or expired link");
        }


        const isValid = await bcrypt.compare(token, record.tokenHash);
        if (!isValid) {
            throw new Error("Invalid token");
        }

        await prisma.magicLink.update({
            where: { id: record.id },
            data: { used: true },
        });

        const user = await prisma.user.update({
            where: { email },
            data: {
                isEmailVerified: true,
                emailVerifiedAt: new Date(),
            },
        });

        return user;
    }
}

export default new MagicLinkService();
