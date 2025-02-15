import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Navbar from "../components/Navbar";

describe("Navbar", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("deve renderizar corretamente com tema light padrão", () => {
    render(<Navbar />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText(/América/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /abrir menu/i })
    ).toBeInTheDocument();
  });

  it("deve alternar o tema entre light e dark", async () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: /abrir menu/i }));
    const themeButton = await screen.findByTestId("theme-button");
    fireEvent.click(themeButton);
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    fireEvent.click(themeButton);
    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });

  it("deve abrir e fechar o menu mobile", async () => {
    render(<Navbar />);

    const menuButton = screen.getByRole("button", { name: /abrir menu/i });
    fireEvent.click(menuButton);
    const menu = await screen.findByRole("menu");
    expect(menu).toBeInTheDocument();

    const closeButton = await screen.findByRole("button", {
      name: /fechar menu mobile/i,
    });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("deve fechar o menu ao clicar no overlay", async () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: /abrir menu/i }));
    fireEvent.click(await screen.findByTestId("menu-overlay"));
    await waitFor(() =>
      expect(screen.queryByRole("menu")).not.toBeInTheDocument()
    );
  });

  it("deve conter links funcionais com ícones", async () => {
    render(<Navbar />);
    fireEvent.click(screen.getByRole("button", { name: /abrir menu/i }));
    await waitFor(() => {
      expect(screen.getByTestId("linkedin-icon")).toBeInTheDocument();
      expect(screen.getByTestId("github-icon")).toBeInTheDocument();
    });
  });
});
