import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar";

describe("Navbar", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("deve alternar o tema de light para dark quando clicado", () => {
    render(<Navbar />);
    const themeButton = screen.getByTestId("theme-toggle-button");

    expect(document.documentElement).toHaveAttribute("data-theme", "light");

    fireEvent.click(themeButton);
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");

    fireEvent.click(themeButton);
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });
});
