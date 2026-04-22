import ticketRepository from "./ticket.repository.js";
import orderRepository from "../orders/order.repository.js";
import jwt from "jsonwebtoken";

class TicketService {
    async initializeEntry(userId, orderId) {
        const order = await orderRepository.findById(orderId, { qrPass: true });

        if (!order) throw new Error("Order not found");
        if (order.userId !== userId) throw new Error("Unauthorized access to this asset");

       
        let qrId = order.qrPass?.id;
        if (!qrId) {
            const newQr = await ticketRepository.create({ orderId: order.id });
            qrId = newQr.id;
        }

       
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

export default new TicketService();
