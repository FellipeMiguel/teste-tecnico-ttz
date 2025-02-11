import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../page";

describe("Home Component", () => {
  test("renders without crashing", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Criar objetivo")).toBeInTheDocument();
  });

  test("adds a new objective", () => {
    const { getByText, getByPlaceholderText } = render(<Home />);

    fireEvent.click(getByText("Criar objetivo"));
    fireEvent.change(getByPlaceholderText("Digite o objetivo"), {
      target: { value: "Novo Objetivo" },
    });
    fireEvent.click(getByText("Salvar"));

    expect(getByText("Novo Objetivo")).toBeInTheDocument();
  });

  test("deletes an objective", () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<Home />);

    fireEvent.click(getByText("Criar objetivo"));
    fireEvent.change(getByPlaceholderText("Digite o objetivo"), {
      target: { value: "Objetivo a Deletar" },
    });
    fireEvent.click(getByText("Salvar"));

    fireEvent.click(getByText("Delete"));

    expect(queryByText("Objetivo a Deletar")).not.toBeInTheDocument();
  });

  test("adds a new key result", () => {
    const { getByText, getByPlaceholderText } = render(<Home />);

    fireEvent.click(getByText("Criar objetivo"));
    fireEvent.change(getByPlaceholderText("Digite o objetivo"), {
      target: { value: "Objetivo com Resultado" },
    });
    fireEvent.click(getByText("Salvar"));

    fireEvent.click(getByText("+ Adicionar Resultado-Chave"));
    fireEvent.change(getByPlaceholderText("Digite o resultado-chave"), {
      target: { value: "Novo Resultado-Chave" },
    });
    fireEvent.click(getByText("Salvar"));

    expect(getByText("Novo Resultado-Chave")).toBeInTheDocument();
  });
});
