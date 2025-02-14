import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmationDialog from "../components/ConfirmationDialog";

describe("ConfirmationDialog", () => {
  const mockConfirm = jest.fn();
  const mockCancel = jest.fn();

  it("deve chamar onConfirm ao clicar em Confirmar", () => {
    render(
      <ConfirmationDialog
        isOpen={true}
        title="Confirmação"
        message="Tem certeza?"
        onConfirm={mockConfirm}
        onCancel={mockCancel}
      />
    );

    const confirmButton = screen.getByTestId("confirm-button");
    fireEvent.click(confirmButton);

    expect(mockConfirm).toHaveBeenCalledTimes(1);
  });
});
