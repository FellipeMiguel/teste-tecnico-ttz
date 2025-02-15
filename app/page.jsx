"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [okrsResponse, resultKeysResponse] = await Promise.all([
          getOKRs(),
          getResultKeys(),
        ]);
        const validObjectives = okrsResponse.data;
        const validResultKeys = resultKeysResponse.data.filter((resultKey) =>
          validObjectives.some((okr) => okr.id === resultKey.okrId)
        );
        setObjectives(validObjectives);
        setResultKeys(validResultKeys);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  const calculateAveragePercent = (keyResults = []) => {
    if (!keyResults.length) return 0;

    const validResults = keyResults.filter(
      (kr) => typeof kr.percent === "number" && !isNaN(kr.percent)
    );

    if (!validResults.length) return 0;

    const total = validResults.reduce((sum, kr) => sum + kr.percent, 0);
    return (total / validResults.length).toFixed(1);
  };

  const handleAddObjective = async (newObjective) => {
    try {
      const response = await createOKR({ ...newObjective, keyResults: [] });
      setObjectives([...objectives, response.data]);
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
              keyResults: obj.keyResults.map((kr) =>
                kr.id === selectedKeyResult.id ? updatedKeyResult : kr
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
        keyResults: selectedObjective.keyResults.map((kr) =>
          kr.id === selectedKeyResult.id ? updatedKeyResult : kr
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
        setObjectives(
          objectives.filter(
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

  const calculateObjectivePercent = (keyResults) =>
    parseFloat(calculateAveragePercent(keyResults));

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto p-2 flex-grow">
        <section className="p-5 bg-primary/10 rounded-md shadow-md">
          <PageTitle />
          <div className="flex justify-end">
            <button
              className="flex items-center gap-1 bg-primary hover:bg-primary/80 text-foreground py-1 px-3 rounded-md"
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
          onClose={() => {
            setIsCreateKeyResultModalOpen(false);
            setSelectedObjective(null);
            setSelectedKeyResult(null);
          }}
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
