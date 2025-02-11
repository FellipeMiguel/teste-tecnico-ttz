"use client";

import { useState } from "react";
import { PageTitle } from "./components/PageTitle";
import Panel from "./components/Panel";
import CreateObjectiveModal from "./components/CreateObjectiveModal";

export default function Home() {
  const [objective, setObjective] = useState([
    {
      id: 1,
      title: "Melhorar a satisfação do Cliente",
      percent: 37,
      keyResults: [
        {
          title: "Aumentar o NPS de 60 para 80",
          percent: 35,
          entregas: [
            {
              name: "Implementar pesquisas de satisfação pós-atendimento",
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddObjetivo = () => {
    // Lógica para adicionar um novo objetivo
    setIsModalOpen(false);
  };

  return (
    <main className="container mx-auto p-2">
      <section className="p-5 bg-gray-50">
        <PageTitle />
        <div className="flex justify-end">
          <button
            className="flex items-center gap-1 bg-[#0094B5] hover:bg-[#0094b581] text-white py-1 px-3 rounded-md"
            onClick={() => setIsModalOpen(true)}
          >
            <span>+</span> Criar Objetivo
          </button>
        </div>

        <div className="mt-5 flex justify-between flex-wrap">
          {objective.map((objetivo) => (
            <Panel key={objetivo.id} objetivo={objetivo} />
          ))}
        </div>
      </section>
      <CreateObjectiveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddObjetivo}
      />
    </main>
  );
}
