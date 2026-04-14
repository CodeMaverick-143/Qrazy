import { BaseRepository } from "../../common/repositories/base.repository.js";
import prisma from "../../config/prisma.js";

class TicketRepository extends BaseRepository {
  constructor() {
    super(prisma.qRPass);
  }
}

export default new TicketRepository();
