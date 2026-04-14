import { BaseRepository } from "../../common/repositories/base.repository.js";
import prisma from "../../config/prisma.js";

class ClubRepository extends BaseRepository {
  constructor() {
    super(prisma.club);
  }
}

export default new ClubRepository();
