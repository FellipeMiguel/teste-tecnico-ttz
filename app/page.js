"use client";

import { useState } from "react";
import { PageTitle } from "./components/PageTitle";
import Panel from "./components/Panel";
import CreateObjectiveModal from "./components/CreateObjectiveModal";
import CreateKeyResultModal from "./components/CreateKeyResultModal";

export default function Home() {
  const [objectives, setObjectives] = useState([
    {
      id: 1,
      title: "Melhorar satisfação do cliente",
      percent: 37,
      keyResults: [
        {
          title: "Aumentar o NPS de 60 para 80",
          percent: 35,
          deliveries: [
            {
              name: "Implementar pesquisas de sastifação pós-atendimento",
              percent: 25,
            },
            {
              name: "Criar um programa de fidelidade para clientes recorrentes",
              percent: 10,
            },
          ],
        },
        {
          title: "Aumentar o NPS de 60 para 80",
          percent: 35,
          deliveries: [
            {
              name: "Implementar pesquisas de sastifação pós-atendimento",
              percent: 25,
            },
            {
              name: "Criar um programa de fidelidade para clientes recorrentes",
              percent: 10,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Melhorar satisfação do cliente",
      percent: 37,
      keyResults: [
        {
          title: "Aumentar o NPS de 60 para 80",
          percent: 35,
          deliveries: [
            {
              name: "Implementar pesquisas de sastifação pós-atendimento",
              percent: 25,
            },
            {
              name: "Criar um programa de fidelidade para clientes recorrentes",
              percent: 10,
            },
          ],
        },
      ],
    },
  ]);

  const [isCreateObjectiveModalOpen, setIsCreateObjectiveModalOpen] =
    useState(false);
  const [isCreateKeyResultModalOpen, setIsCreateKeyResultModalOpen] =
    useState(false);
  const [selectedObjective, setSelectedObjective] = useState(null);

  const handleAddObjective = () => {
    setIsCreateObjectiveModalOpen(false);
  };

  const handleAddKeyResult = (keyResult) => {
    setObjectives((prevObjectives) =>
      prevObjectives.map((objective) =>
        objective.id === selectedObjective.id
          ? { ...objective, keyResults: [...objective.keyResults, keyResult] }
          : objective
      )
    );
    setIsCreateKeyResultModalOpen(false);
    setSelectedObjective(null);
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
              <Panel objective={objective} />
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
        onSave={handleAddKeyResult}
      />
    </main>
  );
}
