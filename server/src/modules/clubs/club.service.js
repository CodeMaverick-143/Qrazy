import clubRepository from "./club.repository.js";

class ClubService {
    async getAll(query = {}) {
        const { city, verified } = query;

        return await clubRepository.findMany(
            {
                ...(city && { city: { contains: city, mode: 'insensitive' } }),
                ...(verified !== undefined && { verified: verified === 'true' })
            },
            {
                events: {
                    take: 1,
                    orderBy: { date: 'asc' },
                    where: { date: { gte: new Date() } }
                }
            }
        );
    }

    async getById(id) {
        return await clubRepository.findById(
            id,
            {
                events: {
                    include: {
                        passTypes: true
                    },
                    where: { date: { gte: new Date() } },
                    orderBy: { date: 'asc' }
                }
            }
        );
    }
}

export default new ClubService();
