import { BaseRepository } from "../../common/repositories/base.repository.js";
import prisma from "../../config/prisma.js";

class ScanLogRepository extends BaseRepository {
  constructor() {
    super(prisma.scanLog);
  }
}

export default new ScanLogRepository();
