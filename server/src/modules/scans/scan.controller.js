import scanService from "./scan.service.js";

class ScanController {
  async scanPass(req, res, next) {
    try {
      const { passId, clubId } = req.body;
      if (!passId || !clubId) {
        return res.status(400).json({ message: "Pass ID and Club ID are required" });
      }

      const result = await scanService.validatePass(passId, clubId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getStats(req, res, next) {
    try {
      const { clubId } = req.query;
      if (!clubId) {
        return res.status(400).json({ message: "Club ID is required" });
      }

      const stats = await scanService.getStats(clubId);
      res.status(200).json(stats);
    } catch (error) {
      next(error);
    }
  }
}

export default new ScanController();
