import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import { it, expect, describe, vi } from "vitest";
import { AuthProvider } from "../context/AuthContext";

vi.mock("../lib/supabase", () => ({
  supabase: {
    auth: {
      getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
  },
}));

describe("Navbar Component Unit Test", () => {
  it("renders brand name correctly", async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
        </AuthProvider>
      </BrowserRouter>
    );

    const brand = await screen.findByText(/Qrazy/i);
    expect(brand).toBeInTheDocument();
  });

  it("renders navigation links", async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(await screen.findByText(/Clubs/i)).toBeInTheDocument();
    expect(await screen.findByText(/Events/i)).toBeInTheDocument();
  });
});
