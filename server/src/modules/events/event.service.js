import prisma from "../../config/prisma.js";

class EventService {
  async getAll(filters = {}) {
    const { city, search } = filters;

    return await prisma.event.findMany({
      where: {
        date: {
          gte: new Date(),
        },
        ...(city && {
          club: {
            city: {
              contains: city,
              mode: "insensitive",
            },
          },
        }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { club: { name: { contains: search, mode: "insensitive" } } },
          ],
        }),
      },
      include: {
        club: true,
        passTypes: true,
      },
      orderBy: {
        date: "asc",
      },
    });
  }

  async getById(id) {
    return await prisma.event.findUnique({
      where: { id },
      include: {
        club: true,
        passTypes: {
          orderBy: {
            price: "asc",
          },
        },
      },
    });
  }
}

export default new EventService();
