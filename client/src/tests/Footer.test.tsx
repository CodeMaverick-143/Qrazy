import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../components/Footer";
import { it, expect, describe } from "vitest";

describe("Footer Component Unit Test", () => {
  it("renders the copyright text and brand name", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    const brandElements = screen.getAllByText(/Qrazy/i);
    expect(brandElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/Built for the underground/i)).toBeInTheDocument();
  });

  it("contains basic social/legal links", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
    expect(screen.getByText(/Privacy/i)).toBeInTheDocument();
    expect(screen.getByText(/Cookies/i)).toBeInTheDocument();
  });
});
