import { render, screen, fireEvent } from "@testing-library/react";
import Panel from "../components/Panel";

describe("Panel", () => {
  const mockObjective = {
    id: 1,
    title: "Objetivo Teste",
    percent: 50,
    keyResults: [
      { id: 1, title: "Resultado-Chave 1", percent: 50, deliveries: [] },
    ],
  };

  it("deve exibir o título do objetivo corretamente", () => {
    render(
      <Panel
        objective={mockObjective}
        onAddKeyResult={() => {}}
        onEditKeyResult={() => {}}
        onDeleteObjective={() => {}}
      />
    );

    expect(screen.getByText("Objetivo Teste")).toBeInTheDocument();
  });
});
