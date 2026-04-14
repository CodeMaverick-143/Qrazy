import ticketService from "./ticket.service.js";

class TicketController {
    async initializeEntry(req, res, next) {
        try {
            const { orderId } = req.params;
            const userId = req.user.id;
            const result = await ticketService.initializeEntry(userId, orderId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new TicketController();
