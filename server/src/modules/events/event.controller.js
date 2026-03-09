import eventService from "./event.service.js";

class EventController {
    async getAll(req, res, next) {
        try {
            const { city, search } = req.query;
            const events = await eventService.getAll({ city, search });
            res.status(200).json(events);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const event = await eventService.getById(id);
            if (!event) {
                return res.status(404).json({ message: "Event not found" });
            }
            res.status(200).json(event);
        } catch (error) {
            next(error);
        }
    }
}

export default new EventController();
