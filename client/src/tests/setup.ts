import "@testing-library/jest-dom";
import { vi, beforeAll } from "vitest";


vi.mock("../lib/supabase", () => ({
  supabase: {
    auth: {
      getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
    },
  },
}));

beforeAll(() => {
  globalThis.console.error = vi.fn();
  globalThis.console.warn = vi.fn();
});
