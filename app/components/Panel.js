import React, { useState } from "react";
import CreateKeyResultModal from "./CreateKeyResultModal";

const ProgressBar = ({ percent }) => (
  <div className="flex items-center gap-2">
    <div className="relative w-full bg-[#c0e3eb] rounded-full h-4">
      <div
        className="bg-[#0094B5] rounded-full h-4"
        style={{ width: `${percent}%` }}
      ></div>
      <span className="absolute top-1/2 left-[50%] transform -translate-y-1/2 -translate-x-1/2 text-xs">
        {percent}%
      </span>
    </div>
  </div>
);

const Delivery = ({ name, percent }) => (
  <li className="text-sm text-gray-400 flex justify-between">
    {name} <span>{percent}%</span>
  </li>
);

const KeyResult = ({ title, percent, deliveries, onEdit }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center">
      <h2 className="font-bold mb-2">{title}</h2>
      <button className="text-[#0094B5] hover:underline" onClick={onEdit}>
        Editar
      </button>
    </div>
    <ProgressBar percent={percent} />
    <ul className="mt-2 flex flex-col gap-2">
      {deliveries.map((delivery, index) => (
        <Delivery key={index} name={delivery.name} percent={delivery.percent} />
      ))}
    </ul>
    <hr className="my-5" />
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

  const handleAddKeyResult = (keyResult) => {
    onAddKeyResult(objective, keyResult);
    setIsCreateKeyResultModalOpen(false);
  };

  return (
    <div className="w-full">
      <div className="bg-white p-5 rounded-md shadow-sm ">
        <div className="flex justify-between items-center">
          <h2 className="font-bold mb-2">{objective.title}</h2>
          <button
            className="text-red-500 hover:underline"
            onClick={() => onDeleteObjective(objective)}
          >
            Delete
          </button>
        </div>
        <ProgressBar percent={objective.percent} />
        <div className="flex items-center justify-between py-3">
          <hr className="text-black w-[40%]" />
          <h3 className="text-gray-400 text-sm">Resultados-Chave</h3>
          <hr className="text-black w-[40%]" />
        </div>
        {objective.keyResults && objective.keyResults.length > 0 ? (
          objective.keyResults.map((keyResult, index) => (
            <KeyResult
              key={index}
              {...keyResult}
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
          className="text-[#0094B5] hover:underline mt-1"
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
