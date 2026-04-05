import prisma from "../../config/prisma.js";

class ScanService {
  async validatePass(passId, clubId) {
    const pass = await prisma.qRPass.findUnique({
      where: { id: passId },
      include: {
        order: {
          include: {
            passType: {
              include: { event: true },
            },
          },
        },
      },
    });

    if (!pass) return { valid: false, error: "Invalid Pass ID" };
    if (pass.status === "USED") return { valid: false, error: "Pass already scanned" };
    if (pass.order.passType.event.clubId !== clubId) {
      return { valid: false, error: "Pass not valid for this club" };
    }

    await prisma.$transaction([
      prisma.qRPass.update({
        where: { id: passId },
        data: { status: "USED" },
      }),
      prisma.scanLog.create({
        data: {
          passId,
          clubId,
          status: "SUCCESS",
        },
      }),
    ]);

    return { valid: true, pass };
  }

  async getStats(clubId) {
    const [totalSales, totalEntries, activeEvents] = await Promise.all([
      prisma.order.count({
        where: { passType: { event: { clubId } } },
      }),
      prisma.scanLog.count({
        where: { clubId, status: "SUCCESS" },
      }),
      prisma.event.count({
        where: { clubId, date: { gte: new Date() } },
      }),
    ]);

    return { totalSales, totalEntries, activeEvents };
  }
}

export default new ScanService();
