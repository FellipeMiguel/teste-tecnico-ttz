import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../page";

describe("Home Component", () => {
  test("renders without crashing", () => {
    const { getByText } = render(<Home />);
    expect(getByText("Criar objetivo")).toBeInTheDocument();
  });

  test("adds a new objective", async () => {
    const { getByText, getByPlaceholderText, queryByTestId } = render(<Home />);

    fireEvent.click(getByText("Criar objetivo"));
    fireEvent.change(getByPlaceholderText("Digite o objetivo"), {
      target: { value: "Novo Objetivo" },
    });
    fireEvent.click(getByText("Salvar"));

    await waitFor(() => {
      expect(
        queryByTestId("objective-title-Novo Objetivo")
      ).toBeInTheDocument();
    });
  });

  test("deletes an objective", async () => {
    const { getByText, getByPlaceholderText, queryByTestId } = render(<Home />);

    fireEvent.click(getByText("Criar objetivo"));
    fireEvent.change(getByPlaceholderText("Digite o objetivo"), {
      target: { value: "Objetivo a Deletar" },
    });
    fireEvent.click(getByText("Salvar"));

    await waitFor(() => {
      expect(
        queryByTestId("objective-title-Objetivo a Deletar")
      ).toBeInTheDocument();
    });

    fireEvent.click(queryByTestId("delete-button-Objetivo a Deletar"));

    fireEvent.click(queryByTestId("confirm-button"));

    await waitFor(() => {
      expect(
        queryByTestId("objective-title-Objetivo a Deletar")
      ).not.toBeInTheDocument();
    });
  });

  test("adds a new key result", async () => {
    const { getByText, getByPlaceholderText, queryByTestId } = render(<Home />);

    fireEvent.click(getByText("Criar objetivo"));
    fireEvent.change(getByPlaceholderText("Digite o objetivo"), {
      target: { value: "Objetivo com Resultado" },
    });
    fireEvent.click(getByText("Salvar"));

    await waitFor(() => {
      expect(
        queryByTestId("objective-title-Objetivo com Resultado")
      ).toBeInTheDocument();
    });

    fireEvent.click(
      queryByTestId("add-keyresult-button-Objetivo com Resultado")
    );
    fireEvent.change(getByPlaceholderText("Digite o resultado-chave"), {
      target: { value: "Novo Resultado-Chave" },
    });
    fireEvent.click(getByText("Salvar"));

    await waitFor(() => {
      expect(
        queryByTestId("keyresult-title-Novo Resultado-Chave")
      ).toBeInTheDocument();
    });
  });
});
