import scanService from "./scan.service.js";

class ScanController {
    async scanQR(req, res, next) {
        try {
            const { token } = req.body;
            if (!token) return res.status(400).json({ message: "No token provided" });

            const result = await scanService.processScan(token, req.user.id);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async getScanHistory(req, res, next) {
        try {
            const { clubId } = req.params;
            if (!clubId) return res.status(400).json({ message: "Club ID required to fetch logs" });
            
            const history = await scanService.getHistory(clubId);
            res.status(200).json(history);
        } catch (error) {
            next(error);
        }
    }
}

export default new ScanController();
