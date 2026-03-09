import clubService from "./club.service.js";

class ClubController {
    async getAll(req, res, next) {
        try {
            const clubs = await clubService.getAll(req.query);
            res.status(200).json(clubs);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const club = await clubService.getById(req.params.id);
            if (!club) {
                return res.status(404).json({ message: "Club not found" });
            }
            res.status(200).json(club);
        } catch (error) {
            next(error);
        }
    }
}

export default new ClubController();
