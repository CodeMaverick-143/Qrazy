import { BaseRepository } from "../../common/repositories/base.repository.js";
import prisma from "../../config/prisma.js";

class OrderRepository extends BaseRepository {
  constructor() {
    super(prisma.order);
  }

  async createTransactional(userId, passTypeId) {
      return await prisma.$transaction(async (tx) => {
         
          const passType = await tx.passType.findUnique({
              where: { id: passTypeId },
              include: { event: true }
          });

          if (!passType) throw new Error("Pass type not found");
          if (passType.capacity <= 0) throw new Error("Sold out");

         
          const order = await tx.order.create({
              data: {
                  userId,
                  passTypeId
              }
          });

         
          await tx.qRPass.create({
              data: {
                  orderId: order.id
              }
          });

         
          await tx.passType.update({
              where: { id: passTypeId },
              data: { capacity: { decrement: 1 } }
          });

          return await tx.order.findUnique({
              where: { id: order.id },
              include: {
                  qrPass: true,
                  passType: {
                      include: { event: { include: { club: true } } }
                  }
              }
          });
      });
  }
}

export default new OrderRepository();
