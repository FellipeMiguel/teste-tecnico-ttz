import { render, screen, fireEvent } from "@testing-library/react";
import CreateKeyResultModal from "../components/CreateKeyResultModal";

describe("CreateKeyResultModal", () => {
  const mockSave = jest.fn();
  const mockClose = jest.fn();

  beforeEach(() => {
    mockSave.mockClear();
    mockClose.mockClear();
  });

  it("deve adicionar uma nova entrega", () => {
    render(
      <CreateKeyResultModal
        isOpen={true}
        onClose={mockClose}
        onSave={mockSave}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Nova entrega"), {
      target: { value: "Entrega Teste" },
    });
    fireEvent.change(screen.getByPlaceholderText("Valor%"), {
      target: { value: "50" },
    });
    fireEvent.click(screen.getByText("Adicionar"));

    expect(screen.getByDisplayValue("Entrega Teste")).toBeInTheDocument();
    expect(screen.getByDisplayValue("50")).toBeInTheDocument();
  });

  it("não deve adicionar entrega com campos vazios", () => {
    render(
      <CreateKeyResultModal
        isOpen={true}
        onClose={mockClose}
        onSave={mockSave}
      />
    );

    fireEvent.click(screen.getByText("Adicionar"));
    expect(screen.queryAllByDisplayValue(/Entrega/)).toHaveLength(0);
  });

  it("deve excluir uma entrega", () => {
    render(
      <CreateKeyResultModal
        isOpen={true}
        onClose={mockClose}
        onSave={mockSave}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Nova entrega"), {
      target: { value: "Entrega para Excluir" },
    });
    fireEvent.change(screen.getByPlaceholderText("Valor%"), {
      target: { value: "50" },
    });
    fireEvent.click(screen.getByText("Adicionar"));
    fireEvent.click(screen.getByText("Deletar"));

    expect(
      screen.queryByDisplayValue("Entrega para Excluir")
    ).not.toBeInTheDocument();
  });

  it("deve salvar o resultado-chave com as entregas", () => {
    render(
      <CreateKeyResultModal
        isOpen={true}
        onClose={mockClose}
        onSave={mockSave}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Digite o resultado-chave"), {
      target: { value: "Novo KR" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nova entrega"), {
      target: { value: "Entrega 1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Valor%"), {
      target: { value: "50" },
    });
    fireEvent.click(screen.getByText("Adicionar"));
    fireEvent.click(screen.getByText("Salvar"));

    expect(mockSave).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Novo KR",
        deliveries: expect.arrayContaining([
          expect.objectContaining({
            name: "Entrega 1",
            percent: 50,
          }),
        ]),
      })
    );
  });
});
