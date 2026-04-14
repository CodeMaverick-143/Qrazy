import { BaseRepository } from "../../common/repositories/base.repository.js";
import prisma from "../../config/prisma.js";

class OrderRepository extends BaseRepository {
  constructor() {
    super(prisma.order);
  }

  async createTransactional(userId, passTypeId) {
      return await prisma.$transaction(async (tx) => {
          // 1. Get PassType and check capacity
          const passType = await tx.passType.findUnique({
              where: { id: passTypeId },
              include: { event: true }
          });

          if (!passType) throw new Error("Pass type not found");
          if (passType.capacity <= 0) throw new Error("Sold out");

          // 2. Create Order
          const order = await tx.order.create({
              data: {
                  userId,
                  passTypeId
              }
          });

          // 3. Create QR Pass
          await tx.qRPass.create({
              data: {
                  orderId: order.id
              }
          });

          // 4. Update capacity
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
