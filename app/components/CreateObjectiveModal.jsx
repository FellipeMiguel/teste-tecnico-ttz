import React, { useState } from "react";

const CreateObjectiveModal = ({ isOpen, onClose, onSave }) => {
  const [objectiveTitle, setObjectiveTitle] = useState("");

  const handleSave = () => {
    onSave({ title: objectiveTitle, percent: 0, keyResults: [] });
    setObjectiveTitle("");
  };

  if (!isOpen) return null;

  return (
    <div
      data-testid="objective-modal"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-background p-5 rounded-md shadow-lg w-[90%] md:w-[50%] lg:w-[30%]">
        <h2 className="text-2xl font-bold mb-4">Criar Novo Objetivo</h2>
        <div className="mb-4">
          <input
            data-testid="objective-input"
            type="text"
            className="appearance-none border rounded w-full py-2 px-3 text-foreground bg-background leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Digite o objetivo"
            value={objectiveTitle}
            onChange={(e) => setObjectiveTitle(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            className="bg-secondary/20 hover:bg-secondary/30 text-foreground font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            data-testid="save-objective-button"
            className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded"
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
