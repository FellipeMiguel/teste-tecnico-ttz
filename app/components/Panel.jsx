import React, { useState } from "react";
import CreateKeyResultModal from "./CreateKeyResultModal";

const ProgressBar = ({ percent }) => (
  <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
    <div
      className="absolute h-full bg-primary transition-all duration-500"
      style={{ width: `${percent}%` }}
    />
    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium text-foreground">
      {percent.toFixed(1)}%
    </span>
  </div>
);

const calculateAveragePercent = (items = []) => {
  if (!items.length) return 0;

  const validItems = items.filter(
    (item) => typeof item.percent === "number" && !isNaN(item.percent)
  );

  if (!validItems.length) return 0;

  const total = validItems.reduce((sum, item) => sum + item.percent, 0);
  return total / validItems.length;
};

const KeyResult = ({ title, percent, deliveries, onEdit }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center">
      <h2 className="font-bold mb-2 break-words text-black">{title}</h2>
      <button className="text-blue-500 hover:underline" onClick={onEdit}>
        Editar
      </button>
    </div>
    <ProgressBar percent={percent} />
    <ul className="mt-2 flex flex-col gap-2">
      {deliveries.map((delivery, index) => (
        <li
          key={index}
          className="text-sm text-gray-500 flex justify-between break-words"
        >
          <span className="overflow-hidden text-ellipsis">{delivery.name}</span>
          <span>{delivery.percent}%</span>
        </li>
      ))}
    </ul>
    <hr className="my-5 border-gray-400" />
  </div>
);

const Panel = ({
  objective,
  onAddKeyResult,
  onEditKeyResult,
  onDeleteObjective,
}) => {
  const [isCreateKeyResultModalOpen, setIsCreateKeyResultModalOpen] =
    useState(false);

  const handleAddKeyResult = async (keyResult) => {
    try {
      await onAddKeyResult(objective, keyResult);
      setIsCreateKeyResultModalOpen(false);
    } catch (error) {
      console.error("Erro ao criar ResultKey:", error);
    }
  };

  return (
    <div className="w-full break-words">
      <div className="bg-white p-5 rounded-md shadow-sm overflow-hidden">
        <div className="flex justify-between items-center">
          <h2 className="font-bold mb-2 break-words text-black">
            {objective.title}
          </h2>
          <button
            className="text-secondary hover:underline"
            onClick={() => onDeleteObjective(objective)}
          >
            Excluir
          </button>
        </div>
        <ProgressBar percent={calculateAveragePercent(objective.keyResults)} />
        <div className="flex items-center justify-between py-3">
          <hr className="text-black w-[27%] lg:w-[36%]" />
          <h3 className="text-gray-400 md:text-sm text-[12px]">
            Resultados-Chave
          </h3>
          <hr className="text-black w-[27%] md:w-[36%]" />
        </div>
        {objective.keyResults && objective.keyResults.length > 0 ? (
          objective.keyResults.map((keyResult, index) => (
            <KeyResult
              key={index}
              {...keyResult}
              percent={calculateAveragePercent(keyResult.deliveries)}
              onEdit={() => onEditKeyResult(objective, keyResult)}
            />
          ))
        ) : (
          <p className="text-sm text-gray-400">
            Nenhum resultado-chave encontrado.
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <button
          className="text-blue-500 hover:underline mt-1"
          onClick={() => setIsCreateKeyResultModalOpen(true)}
        >
          + Adicionar Resultado-Chave
        </button>
      </div>
      <CreateKeyResultModal
        isOpen={isCreateKeyResultModalOpen}
        onClose={() => setIsCreateKeyResultModalOpen(false)}
        onSave={handleAddKeyResult}
      />
    </div>
  );
};

export default Panel;
