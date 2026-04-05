import prisma from "../../config/prisma.js";

class ClubService {
  async getAll(query = {}) {
    const { city, verified } = query;

    return await prisma.club.findMany({
      where: {
        ...(city && { city: { contains: city, mode: "insensitive" } }),
        ...(verified !== undefined && { verified: verified === "true" }),
      },
      include: {
        events: {
          take: 1,
          orderBy: { date: "asc" },
          where: { date: { gte: new Date() } },
        },
      },
    });
  }

  async getById(id) {
    return await prisma.club.findUnique({
      where: { id },
      include: {
        events: {
          include: {
            passTypes: true,
          },
          where: { date: { gte: new Date() } },
          orderBy: { date: "asc" },
        },
      },
    });
  }
}

export default new ClubService();
