import { BaseRepository } from "../../common/repositories/base.repository.js";
import prisma from "../../config/prisma.js";

class PassTypeRepository extends BaseRepository {
  constructor() {
    super(prisma.passType);
  }
}

export default new PassTypeRepository();
