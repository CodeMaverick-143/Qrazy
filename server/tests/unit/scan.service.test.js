import { jest } from "@jest/globals";
import scanService from "../../src/modules/scans/scan.service.js";
import prisma from "../../src/config/prisma.js";

describe("ScanService", () => {
  it("should validate a valid pass", async () => {
    prisma.qRPass.findUnique.mockResolvedValue({
      id: "pass-1",
      status: "VALID",
      order: {
        passType: {
          event: { clubId: "club-1" },
        },
      },
    });

    const result = await scanService.validatePass("pass-1", "club-1");
    expect(result.valid).toBe(true);
  });

  it("should fail for an already USED pass", async () => {
    prisma.qRPass.findUnique.mockResolvedValue({
      id: "pass-2",
      status: "USED",
    });

    const result = await scanService.validatePass("pass-2", "club-1");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Pass already scanned");
  });
});
