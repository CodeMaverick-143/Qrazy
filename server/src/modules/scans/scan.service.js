import scanLogRepository from "./scanLog.repository.js";
import ticketRepository from "../tickets/ticket.repository.js";
import prisma from "../../config/prisma.js";
import jwt from "jsonwebtoken";

class ScanService {
    async processScan(token, scannerUserId) {
       
        
       
        const secret = process.env.JWT_SECRET || "qrazy-protocol-secret-2026";
        let payload;
        try {
            payload = jwt.verify(token, secret);
        } catch (e) {
            throw new Error("Invalid or expired QR pass token");
        }

        const { qrId, orderId } = payload;
        
        return await prisma.$transaction(async (tx) => {
            const qrPass = await tx.qRPass.findUnique({
                where: { id: qrId },
                include: { order: { include: { passType: { include: { event: true } } } } }
            });

            if (!qrPass) throw new Error("Pass not found");
            if (qrPass.used) throw new Error("Pass has already been used");

           
            await tx.qRPass.update({
                where: { id: qrId },
                data: { used: true }
            });

           
            const log = await tx.scanLog.create({
                data: {
                    qrPassId: qrId,
                }
            });

            return { success: true, event: qrPass.order.passType.event.title, log };
        });
    }

    async getHistory(clubId) {
        return await scanLogRepository.findMany(
            { qrPass: { order: { passType: { event: { clubId } } } } },
            { qrPass: { include: { order: { include: { user: true, passType: true } } } } },
            { scannedAt: 'desc' }
        );
    }
}

export default new ScanService();
