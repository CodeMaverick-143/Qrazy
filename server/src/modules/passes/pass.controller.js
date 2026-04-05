import passService from "./pass.service.js";

class PassController {
    async createOrder(req, res, next) {
        try {
            const { passTypeId } = req.body;
            const userId = req.user.id; // From AuthMiddleware

            if (!passTypeId) {
                return res.status(400).json({ message: "Pass type ID is required" });
            }

            const order = await passService.createOrder(userId, passTypeId);
            res.status(201).json(order);
        } catch (error) {
            next(error);
        }
    }

    async getMyOrders(req, res, next) {
        try {
            const orders = await passService.getMyOrders(req.user.id);
            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    }

    async initializeEntry(req, res, next) {
        try {
            const { orderId } = req.params;
            const userId = req.user.id;
            const result = await passService.initializeEntry(userId, orderId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new PassController();
