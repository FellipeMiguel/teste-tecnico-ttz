import React, { useState } from "react";

const CreateObjectiveModal = ({ isOpen, onClose, onSave }) => {
  const [objectiveTitle, setObjectiveTitle] = useState("");

  const handleSave = () => {
    onSave({ title: objectiveTitle, percent: 0, keyResults: [] });
    setObjectiveTitle("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-md shadow-lg w-[90%] md:w-[50%] lg:w-[30%]">
        <h2 className="text-2xl font-bold mb-4">Criar Novo Objetivo</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nome do Objetivo
          </label>
          <input
            type="text"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Digite o objetivo"
            value={objectiveTitle}
            onChange={(e) => setObjectiveTitle(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-[#0094B5] hover:bg-[#007B99] text-white font-bold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateObjectiveModal;
