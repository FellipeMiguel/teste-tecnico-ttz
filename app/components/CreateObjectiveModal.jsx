import React, { useState, useEffect } from "react";

const CreateObjectiveModal = ({ isOpen, onClose, onSave }) => {
  const [objectiveTitle, setObjectiveTitle] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!objectiveTitle.trim()) {
      setError("Título é obrigatório");
      return;
    }
    onSave({ title: objectiveTitle, percent: 0, keyResults: [] });
    setObjectiveTitle("");
    setError("");
  };

  useEffect(() => {
    if (isOpen) document.getElementById("input-titulo")?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-modal"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-background p-5 rounded-md shadow-lg w-[90%] md:w-[50%] lg:w-[30%]">
        <h2 id="titulo-modal" className="text-2xl font-bold mb-4">
          Criar Novo Objetivo
        </h2>

        <div className="mb-4">
          <label htmlFor="input-titulo" className="sr-only">
            Título do objetivo
          </label>
          <input
            id="input-titulo"
            type="text"
            className="appearance-none border rounded w-full py-2 px-3 text-foreground bg-background leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Digite o objetivo"
            value={objectiveTitle}
            onChange={(e) => {
              setObjectiveTitle(e.target.value);
              setError("");
            }}
            aria-invalid={!!error}
            aria-describedby="mensagem-erro"
          />
          {error && (
            <p id="mensagem-erro" className="text-red-500 mt-1" role="alert">
              {error}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="bg-secondary/20 hover:bg-secondary/30 text-foreground font-bold py-2 px-4 rounded"
            onClick={onClose}
            aria-label="Cancelar criação de objetivo"
          >
            Cancelar
          </button>
          <button
            className="bg-primary hover:bg-primary/80 text-white font-bold py-2 px-4 rounded"
            onClick={handleSave}
            aria-label="Salvar novo objetivo"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateObjectiveModal;
