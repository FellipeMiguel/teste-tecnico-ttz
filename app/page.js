"use client";

import React, { useState, useEffect } from "react";
import PageTitle from "./components/PageTitle";
import Panel from "./components/Panel";
import CreateObjectiveModal from "./components/CreateObjectiveModal";
import CreateKeyResultModal from "./components/CreateKeyResultModal";
import ConfirmationDialog from "./components/ConfirmationDialog";
import {
  getOKRs,
  getResultKeys,
  createOKR,
  createResultKey,
  updateOKR,
  updateResultKey,
  deleteOKR,
} from "./api";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Home() {
  const [objectives, setObjectives] = useState([]);
  const [resultKeys, setResultKeys] = useState([]);
  const [isCreateObjectiveModalOpen, setIsCreateObjectiveModalOpen] =
    useState(false);
  const [isCreateKeyResultModalOpen, setIsCreateKeyResultModalOpen] =
    useState(false);
  const [selectedObjective, setSelectedObjective] = useState(null);
  const [selectedKeyResult, setSelectedKeyResult] = useState(null);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const [objectiveToDelete, setObjectiveToDelete] = useState(null);
  const [theme, setTheme] = useState("light"); // Estado para controlar o tema

  // Carregar tema ao iniciar
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
    document.body.classList.toggle("dark", storedTheme === "dark");
    document.body.classList.toggle("light", storedTheme === "light");
  }, []);

  // Carregar dados dos OKRs e ResultKeys
  useEffect(() => {
    async function fetchData() {
      try {
        const [okrsResponse, resultKeysResponse] = await Promise.all([
          getOKRs(),
          getResultKeys(),
        ]);

        // Filtrar resultados-chave órfãos
        const validObjectives = okrsResponse.data;
        const validResultKeys = resultKeysResponse.data.filter((resultKey) =>
          validObjectives.some((okr) => okr.id === resultKey.okrId)
        );

        setObjectives(validObjectives);
        setResultKeys(validResultKeys);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
  }, []);

  // Função para alternar o tema
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    document.body.classList.toggle("dark", newTheme === "dark");
    document.body.classList.toggle("light", newTheme === "light");
    localStorage.setItem("theme", newTheme);
  };

  const calculateAveragePercent = (items) => {
    if (!items || items.length === 0) return 0;
    const totalPercent = items.reduce((acc, item) => acc + item.percent, 0);
    return (totalPercent / items.length).toFixed(1);
  };

  const handleAddObjective = async (newObjective) => {
    try {
      const response = await createOKR({
        ...newObjective,
        keyResults: [],
      });
      setObjectives((prevObjectives) => [...prevObjectives, response.data]);
      setIsCreateObjectiveModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar OKR:", error);
    }
  };

  const handleAddKeyResult = async (objective, keyResult) => {
    try {
      const newResultKey = {
        ...keyResult,
        percent: parseFloat(calculateAveragePercent(keyResult.deliveries)),
        okrId: objective.id,
      };
      const response = await createResultKey(newResultKey);
      const updatedKeyResult = response.data;

      const updatedObjectives = objectives.map((obj) =>
        obj.id === objective.id
          ? {
              ...obj,
              keyResults: obj.keyResults
                ? [...obj.keyResults, updatedKeyResult]
                : [updatedKeyResult],
            }
          : obj
      );
      setObjectives(updatedObjectives);
      setIsCreateKeyResultModalOpen(false);
      setSelectedObjective(null);

      await updateOKR(objective.id, {
        ...objective,
        keyResults: objective.keyResults
          ? [...objective.keyResults, updatedKeyResult]
          : [updatedKeyResult],
      });
    } catch (error) {
      console.error("Erro ao criar ResultKey:", error);
    }
  };

  const handleEditKeyResult = (objective, keyResult) => {
    setSelectedObjective(objective);
    setSelectedKeyResult(keyResult);
    setIsCreateKeyResultModalOpen(true);
  };

  const handleSaveKeyResult = async (editedKeyResult) => {
    try {
      const updatedKeyResult = {
        ...editedKeyResult,
        percent: parseFloat(
          calculateAveragePercent(editedKeyResult.deliveries)
        ),
      };

      await updateResultKey(editedKeyResult.id, updatedKeyResult);

      const updatedObjectives = objectives.map((obj) =>
        obj.id === selectedObjective.id
          ? {
              ...obj,
              keyResults: obj.keyResults.map((keyResult) =>
                keyResult.id === selectedKeyResult.id
                  ? updatedKeyResult
                  : keyResult
              ),
            }
          : obj
      );
      setObjectives(updatedObjectives);
      setIsCreateKeyResultModalOpen(false);
      setSelectedObjective(null);
      setSelectedKeyResult(null);

      await updateOKR(selectedObjective.id, {
        ...selectedObjective,
        keyResults: selectedObjective.keyResults.map((keyResult) =>
          keyResult.id === selectedKeyResult.id ? updatedKeyResult : keyResult
        ),
      });
    } catch (error) {
      console.error("Erro ao atualizar ResultKey:", error);
    }
  };

  const handleDeleteObjectiveClick = (objective) => {
    setObjectiveToDelete(objective);
    setIsConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (objectiveToDelete) {
        await deleteOKR(objectiveToDelete.id);
        setObjectives((prevObjectives) =>
          prevObjectives.filter(
            (objective) => objective.id !== objectiveToDelete.id
          )
        );
        setObjectiveToDelete(null);
        setIsConfirmationDialogOpen(false);
      }
    } catch (error) {
      console.error("Erro ao deletar OKR:", error);
    }
  };

  const handleCancelDelete = () => {
    setObjectiveToDelete(null);
    setIsConfirmationDialogOpen(false);
  };

  const calculateObjectivePercent = (keyResults) => {
    return parseFloat(calculateAveragePercent(keyResults));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
      <Navbar />
      <main className="container mx-auto p-2 flex-grow">
        <section className="p-5 bg-gray-50 dark:bg-gray-800 rounded-md shadow-md">
          <PageTitle />
          <div className="flex justify-end">
            <button
              className="flex items-center gap-1 bg-[#0094B5] hover:bg-[#0094b581] text-white py-1 px-3 rounded-md"
              onClick={() => setIsCreateObjectiveModalOpen(true)}
            >
              <span>+</span>
              Criar objetivo
            </button>
          </div>

          <div className="mt-5 flex justify-between flex-wrap">
            {objectives.map(
              (objective) =>
                objective && (
                  <div key={objective.id} className="w-full md:w-[49%]">
                    <Panel
                      objective={{
                        ...objective,
                        percent: calculateObjectivePercent(
                          objective.keyResults
                        ),
                      }}
                      onAddKeyResult={handleAddKeyResult}
                      onEditKeyResult={handleEditKeyResult}
                      onDeleteObjective={handleDeleteObjectiveClick}
                    />
                  </div>
                )
            )}
          </div>
        </section>
        <CreateObjectiveModal
          isOpen={isCreateObjectiveModalOpen}
          onClose={() => setIsCreateObjectiveModalOpen(false)}
          onSave={handleAddObjective}
        />
        <CreateKeyResultModal
          isOpen={isCreateKeyResultModalOpen}
          onClose={() => setIsCreateKeyResultModalOpen(false)}
          onSave={selectedKeyResult ? handleSaveKeyResult : handleAddKeyResult}
          keyResult={selectedKeyResult}
        />
        <ConfirmationDialog
          isOpen={isConfirmationDialogOpen}
          title="Confirmação de Exclusão"
          message="Você tem certeza que deseja excluir este objetivo? Essa ação não pode ser desfeita."
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      </main>
      <Footer />
    </div>
  );
}
