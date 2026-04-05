import { successResponse, errorResponse } from "../../src/utils/response.js";

describe("Response Utility Unit Tests", () => {
  describe("successResponse", () => {
    it("should return a formatted success object", () => {
      const data = { id: 1, name: "Test" };
      const result = successResponse(data, "Success Message");
      expect(result).toEqual({
        success: true,
        message: "Success Message",
        data: data,
      });
    });

    it("should use default message if not provided", () => {
      const result = successResponse({});
      expect(result.message).toBe("Operation successful");
    });
  });

  describe("errorResponse", () => {
    it("should extract message from Error object", () => {
      const error = new Error("Specific Error");
      const result = errorResponse(error);
      expect(result).toEqual({
        success: false,
        message: "Specific Error",
      });
    });

    it("should use string message if provided", () => {
      const result = errorResponse("String Error");
      expect(result.message).toBe("String Error");
    });
  });
});
