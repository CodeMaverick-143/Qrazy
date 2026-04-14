import payoutService from "./payout.service.js";

class PayoutController {
    async requestPayout(req, res, next) {
        try {
            const { clubId, amount } = req.body;

            // In a real scenario, make sure req.user is a CLUB_ADMIN for clubId
            
            if (!clubId || !amount) {
                return res.status(400).json({ message: "clubId and amount are required" });
            }

            const request = await payoutService.createRequest(clubId, Number(amount));
            res.status(201).json(request);
        } catch (error) {
            next(error);
        }
    }

    async getPayoutHistory(req, res, next) {
        try {
            const { clubId } = req.params;
            const history = await payoutService.getHistory(clubId);
            res.status(200).json(history);
        } catch (error) {
            next(error);
        }
    }

    async getEarnings(req, res, next) {
        try {
            const { clubId } = req.params;
            const earnings = await payoutService.calculateEarnings(clubId);
            res.status(200).json(earnings);
        } catch (error) {
            next(error);
        }
    }
}

export default new PayoutController();
