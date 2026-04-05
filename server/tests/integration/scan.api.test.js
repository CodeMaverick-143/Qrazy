import request from "supertest";
import app from "../../src/app.js";

describe("Scan API Integration", () => {
  it("GET /api/scans/stats - should return 401 without auth", async () => {
    const res = await request(app).get("/api/scans/stats");
    expect(res.status).toBe(401);
  });
});
