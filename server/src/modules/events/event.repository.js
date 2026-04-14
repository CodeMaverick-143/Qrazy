import { BaseRepository } from "../../common/repositories/base.repository.js";
import prisma from "../../config/prisma.js";

class EventRepository extends BaseRepository {
  constructor() {
    super(prisma.event);
  }
}

export default new EventRepository();
