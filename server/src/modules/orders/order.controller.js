import orderService from "./order.service.js";

class OrderController {
    async createOrder(req, res, next) {
        try {
            const { passTypeId } = req.body;
            const userId = req.user.id;

            if (!passTypeId) {
                return res.status(400).json({ message: "Pass type ID is required" });
            }

            const order = await orderService.createOrder(userId, passTypeId);
            res.status(201).json(order);
        } catch (error) {
            next(error);
        }
    }

    async getMyOrders(req, res, next) {
        try {
            const orders = await orderService.getMyOrders(req.user.id);
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }
}

export default new OrderController();
