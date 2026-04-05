import { jest } from "@jest/globals";


process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test-secret";
process.env.VITE_API_URL = "http://localhost:4000";


jest.unstable_mockModule("../src/config/prisma.js", () => ({
  __esModule: true,
  default: {
    pass: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    qRPass: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    scanLog: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    },
    order: {
      count: jest.fn(),
    },
    event: {
      count: jest.fn(),
    },
    $transaction: jest.fn((arg) => {
      if (typeof arg === "function") {
        return arg({
          qRPass: { update: jest.fn() },
          scanLog: { create: jest.fn() },
        });
      }
      return Promise.all(arg);
    }),
  },
}));
