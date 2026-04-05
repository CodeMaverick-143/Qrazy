import prisma from "../../config/prisma.js";
import jwt from "jsonwebtoken";

class PassService {
    async createOrder(userId, passTypeId) {
        return await prisma.$transaction(async (tx) => {
            // 1. Get PassType and check capacity
            const passType = await tx.passType.findUnique({
                where: { id: passTypeId },
                include: { event: true }
            });

            if (!passType) throw new Error("Pass type not found");
            if (passType.capacity <= 0) throw new Error("Sold out");

            // 2. Create Order
            const order = await tx.order.create({
                data: {
                    userId,
                    passTypeId
                }
            });

            // 3. Create QR Pass
            await tx.qRPass.create({
                data: {
                    orderId: order.id
                }
            });

            // 4. Update capacity
            await tx.passType.update({
                where: { id: passTypeId },
                data: { capacity: { decrement: 1 } }
            });

            return await tx.order.findUnique({
                where: { id: order.id },
                include: {
                    qrPass: true,
                    passType: {
                        include: { event: { include: { club: true } } }
                    }
                }
            });
        });
    }

    async getMyOrders(userId) {
        return await prisma.order.findMany({
            where: { userId },
            include: {
                qrPass: true,
                passType: {
                    include: {
                        event: {
                            include: { club: true }
                        }
                    }
                }
            },
            orderBy: { id: 'desc' }
        });
    }

    async initializeEntry(userId, orderId) {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { qrPass: true }
        });

        if (!order) throw new Error("Order not found");
        if (order.userId !== userId) throw new Error("Unauthorized access to this asset");

        // Safety: If QRPass doesn't exist for some reason, create it now
        let qrId = order.qrPass?.id;
        if (!qrId) {
            const newQr = await prisma.qRPass.create({
                data: { orderId: order.id }
            });
            qrId = newQr.id;
        }

        // Generate a signed token for the QR code
        const secret = process.env.JWT_SECRET || "qrazy-protocol-secret-2026";
        const token = jwt.sign({
            orderId: order.id,
            userId: order.userId,
            qrId: qrId,
            timestamp: Date.now()
        }, secret, { expiresIn: '2h' });

        return { token };
    }
}

export default new PassService();
