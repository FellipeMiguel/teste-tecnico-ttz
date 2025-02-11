import React from "react";
import { useState } from "react";
import { PageTitle } from "./components/PageTitle";
import Panel from "./components/Panel";
import CreateObjectiveModal from "./components/CreateObjectiveModal";
import CreateKeyResultModal from "./components/CreateKeyResultModal";

export default function Home() {
  const [objectives, setObjectives] = useState([]);

  const [isCreateObjectiveModalOpen, setIsCreateObjectiveModalOpen] =
    useState(false);
  const [isCreateKeyResultModalOpen, setIsCreateKeyResultModalOpen] =
    useState(false);
  const [selectedObjective, setSelectedObjective] = useState(null);
  const [selectedKeyResult, setSelectedKeyResult] = useState(null);

  const calculateAveragePercent = (items) => {
    if (items.length === 0) return 0;
    const totalPercent = items.reduce((acc, item) => acc + item.percent, 0);
    return (totalPercent / items.length).toFixed(1);
  };

  const handleAddObjective = (newObjective) => {
    setObjectives((prevObjectives) => [
      ...prevObjectives,
      { ...newObjective, id: prevObjectives.length + 1, keyResults: [] },
    ]);
    setIsCreateObjectiveModalOpen(false);
  };

  const handleAddKeyResult = (objective, keyResult) => {
    const updatedKeyResult = {
      ...keyResult,
      percent: parseFloat(calculateAveragePercent(keyResult.deliveries)),
    };
    setObjectives((prevObjectives) =>
      prevObjectives.map((obj) =>
        obj.id === objective.id
          ? {
              ...obj,
              keyResults: [...obj.keyResults, updatedKeyResult],
            }
          : obj
      )
    );
    setIsCreateKeyResultModalOpen(false);
    setSelectedObjective(null);
  };

  const handleEditKeyResult = (objective, keyResult) => {
    setSelectedObjective(objective);
    setSelectedKeyResult(keyResult);
    setIsCreateKeyResultModalOpen(true);
  };

  const handleSaveKeyResult = (editedKeyResult) => {
    const updatedKeyResult = {
      ...editedKeyResult,
      percent: parseFloat(calculateAveragePercent(editedKeyResult.deliveries)),
    };
    setObjectives((prevObjectives) =>
      prevObjectives.map((objective) =>
        objective.id === selectedObjective.id
          ? {
              ...objective,
              keyResults: objective.keyResults.map((keyResult) =>
                keyResult === selectedKeyResult ? updatedKeyResult : keyResult
              ),
            }
          : objective
      )
    );
    setIsCreateKeyResultModalOpen(false);
    setSelectedObjective(null);
    setSelectedKeyResult(null);
  };

  const handleDeleteObjective = (objectiveToDelete) => {
    setObjectives((prevObjectives) =>
      prevObjectives.filter(
        (objective) => objective.id !== objectiveToDelete.id
      )
    );
  };

  const calculateObjectivePercent = (keyResults) => {
    return parseFloat(calculateAveragePercent(keyResults));
  };

  return (
    <main className="container mx-auto p-2">
      <section className="p-5 bg-gray-50">
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
          {objectives.map((objective) => (
            <div key={objective.id} className="w-full md:w-[49%]">
              <Panel
                objective={{
                  ...objective,
                  percent: calculateObjectivePercent(objective.keyResults),
                }}
                onAddKeyResult={handleAddKeyResult}
                onEditKeyResult={handleEditKeyResult}
                onDeleteObjective={handleDeleteObjective}
              />
            </div>
          ))}
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
    </main>
  );
}
