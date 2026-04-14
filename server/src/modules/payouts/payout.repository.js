import { BaseRepository } from "../../common/repositories/base.repository.js";
import prisma from "../../config/prisma.js";

class PayoutRepository extends BaseRepository {
  constructor() {
    super(prisma.payoutRequest);
  }
}

export default new PayoutRepository();
