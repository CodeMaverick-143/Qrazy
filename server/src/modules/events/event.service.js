import eventRepository from "./event.repository.js";

class EventService {
    async getAll(filters = {}) {
        const { city, search } = filters;

        return await eventRepository.findMany(
            {
                date: {
                    gte: new Date(),
                },
                ...(city && {
                    club: {
                        city: {
                            contains: city,
                            mode: 'insensitive'
                        }
                    }
                }),
                ...(search && {
                    OR: [
                        { title: { contains: search, mode: 'insensitive' } },
                        { club: { name: { contains: search, mode: 'insensitive' } } }
                    ]
                })
            },
            {
                club: true,
                passTypes: true
            },
            {
                date: 'asc'
            }
        );
    }

    async getById(id) {
        return await eventRepository.findById(
            id,
            {
                club: true,
                passTypes: {
                    orderBy: {
                        price: 'asc'
                    }
                }
            }
        );
    }
}

export default new EventService();
