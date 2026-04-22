import payoutRepository from "./payout.repository.js";
import orderRepository from "../orders/order.repository.js";
import prisma from "../../config/prisma.js";

class PayoutService {
    async createRequest(clubId, amount) {
       
        const club = await prisma.club.findUnique({ where: { id: clubId } });
        if (!club) throw new Error("Club not found");

        const earnings = await this.calculateEarnings(clubId);
        if (amount > earnings.available) {
            throw new Error("Requested amount exceeds available balance");
        }

        return await payoutRepository.create({
            clubId,
            amount,
            status: "PENDING"
        });
    }

    async getHistory(clubId) {
        return await payoutRepository.findMany(
            { clubId },
            {},
            { requestedAt: 'desc' }
        );
    }

    async calculateEarnings(clubId) {
       
        const orders = await orderRepository.findMany({
            passType: {
                event: { clubId }
            }
        }, { passType: true });

        const totalEarned = orders.reduce((sum, order) => sum + order.passType.price, 0);

       
        const payouts = await payoutRepository.findMany({ clubId });
        const totalPaidOut = payouts
            .filter(p => p.status === 'PROCESSED' || p.status === 'PENDING')
            .reduce((sum, p) => sum + p.amount, 0);

        return {
            total: totalEarned,
            withdrawn: totalPaidOut,
            available: totalEarned - totalPaidOut
        };
    }
}

export default new PayoutService();
