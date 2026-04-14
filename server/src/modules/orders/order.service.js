import orderRepository from "./order.repository.js";

class OrderService {
    async createOrder(userId, passTypeId) {
        return await orderRepository.createTransactional(userId, passTypeId);
    }

    async getMyOrders(userId) {
        return await orderRepository.findMany(
            { userId },
            {
                qrPass: true,
                passType: {
                    include: {
                        event: {
                            include: { club: true }
                        }
                    }
                }
            },
            { id: 'desc' }
        );
    }
}

export default new OrderService();
