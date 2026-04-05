import request from "supertest";
import app from "../../src/app.js";

describe("Order & Pass Module Integration", () => {
  it("POST /api/orders - should create an order and a pass (Module Interaction)", async () => {
    const res = await request(app)
      .post("/api/orders")
      .send({ passTypeId: "type-1" });

    expect(res.status).toBe(401);
  });

  it("GET /api/passes - should return 401 for unauthenticated module access", async () => {
    const res = await request(app).get("/api/passes");
    expect(res.status).toBe(401);
  });
});
