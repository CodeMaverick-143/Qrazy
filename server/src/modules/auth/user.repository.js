import { BaseRepository } from "../../common/repositories/base.repository.js";
import prisma from "../../config/prisma.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(prisma.user);
  }

  async upsertByEmail(email, userData) {
    return await this.model.upsert({
      where: { email },
      update: userData,
      create: { ...userData, email },
    });
  }
}

export default new UserRepository();
