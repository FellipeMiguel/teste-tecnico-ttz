import { render, screen, fireEvent } from "@testing-library/react";
import CreateKeyResultModal from "../components/CreateKeyResultModal";

describe("CreateKeyResultModal", () => {
  const mockSave = jest.fn();
  const mockClose = jest.fn();

  it("deve adicionar uma nova entrega", () => {
    render(
      <CreateKeyResultModal
        isOpen={true}
        onClose={mockClose}
        onSave={mockSave}
      />
    );

    const addButton = screen.getByText(/adicionar entrega/i);
    fireEvent.click(addButton);

    const deliveryNameInput = screen.getByPlaceholderText(/digite a entrega/i);
    const deliveryPercentInput = screen.getByPlaceholderText(/valor %/i);

    fireEvent.change(deliveryNameInput, { target: { value: "Nova Entrega" } });
    fireEvent.change(deliveryPercentInput, { target: { value: "50" } });

    expect(deliveryNameInput.value).toBe("Nova Entrega");
    expect(deliveryPercentInput.value).toBe("50");
  });

  it("deve adicionar múltiplas entregas", () => {
    render(
      <CreateKeyResultModal
        isOpen={true}
        onClose={mockClose}
        onSave={mockSave}
      />
    );

    const addButton = screen.getByText(/adicionar entrega/i);

    fireEvent.click(addButton);
    const deliveryNameInput1 = screen.getByPlaceholderText(/digite a entrega/i);
    const deliveryPercentInput1 = screen.getByPlaceholderText(/valor %/i);
    fireEvent.change(deliveryNameInput1, { target: { value: "Entrega 1" } });
    fireEvent.change(deliveryPercentInput1, { target: { value: "50" } });

    fireEvent.click(addButton);
    const deliveryNameInput2 =
      screen.getAllByPlaceholderText(/digite a entrega/i)[1];
    const deliveryPercentInput2 = screen.getAllByPlaceholderText(/valor %/i)[1];
    fireEvent.change(deliveryNameInput2, { target: { value: "Entrega 2" } });
    fireEvent.change(deliveryPercentInput2, { target: { value: "75" } });

    expect(deliveryNameInput1.value).toBe("Entrega 1");
    expect(deliveryPercentInput1.value).toBe("50");
    expect(deliveryNameInput2.value).toBe("Entrega 2");
    expect(deliveryPercentInput2.value).toBe("75");
  });

  it("deve excluir uma entrega", () => {
    render(
      <CreateKeyResultModal
        isOpen={true}
        onClose={mockClose}
        onSave={mockSave}
      />
    );

    const addButton = screen.getByText(/adicionar entrega/i);
    fireEvent.click(addButton);

    const deliveryNameInput = screen.getByPlaceholderText(/digite a entrega/i);
    const deliveryPercentInput = screen.getByPlaceholderText(/valor %/i);
    fireEvent.change(deliveryNameInput, {
      target: { value: "Entrega para Excluir" },
    });
    fireEvent.change(deliveryPercentInput, { target: { value: "25" } });

    const deleteButton = screen.getByText(/delete/i);
    fireEvent.click(deleteButton);

    expect(
      screen.queryByDisplayValue("Entrega para Excluir")
    ).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue("25")).not.toBeInTheDocument();
  });

  it("deve salvar o resultado-chave com as entregas", () => {
    render(
      <CreateKeyResultModal
        isOpen={true}
        onClose={mockClose}
        onSave={mockSave}
      />
    );

    const titleInput = screen.getByPlaceholderText(/digite o resultado-chave/i);
    fireEvent.change(titleInput, {
      target: { value: "Resultado-Chave Teste" },
    });

    const addButton = screen.getByText(/adicionar entrega/i);
    fireEvent.click(addButton);

    const deliveryNameInput = screen.getByPlaceholderText(/digite a entrega/i);
    const deliveryPercentInput = screen.getByPlaceholderText(/valor %/i);
    fireEvent.change(deliveryNameInput, { target: { value: "Entrega Teste" } });
    fireEvent.change(deliveryPercentInput, { target: { value: "50" } });

    const saveButton = screen.getByText(/salvar/i);
    fireEvent.click(saveButton);

    expect(mockSave).toHaveBeenCalledWith({
      title: "Resultado-Chave Teste",
      percent: "",
      deliveries: [
        {
          name: "Entrega Teste",
          percent: 50,
        },
      ],
    });
  });
});
