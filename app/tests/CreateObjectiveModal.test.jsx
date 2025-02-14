import { render, screen, fireEvent } from "@testing-library/react";
import CreateObjectiveModal from "../components/CreateObjectiveModal";

describe("CreateObjectiveModal", () => {
  const mockSave = jest.fn();
  const mockClose = jest.fn();

  it("deve fechar o modal ao clicar em cancelar", () => {
    render(
      <CreateObjectiveModal
        isOpen={true}
        onClose={mockClose}
        onSave={mockSave}
      />
    );

    const cancelButton = screen.getByRole("button", { name: /cancelar/i });
    fireEvent.click(cancelButton);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  it("deve criar novo objetivo ao preencher e salvar", () => {
    render(
      <CreateObjectiveModal
        isOpen={true}
        onClose={mockClose}
        onSave={mockSave}
      />
    );

    const input = screen.getByPlaceholderText(/digite o objetivo/i);
    fireEvent.change(input, { target: { value: "Novo Objetivo Teste" } });

    const saveButton = screen.getByRole("button", { name: /salvar/i });
    fireEvent.click(saveButton);

    expect(mockSave).toHaveBeenCalledWith({
      title: "Novo Objetivo Teste",
      percent: 0,
      keyResults: [],
    });
  });
});
