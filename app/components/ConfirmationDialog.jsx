import React from "react";

const ConfirmationDialog = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-dialogo"
      aria-describedby="descricao-dialogo"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="bg-background p-5 rounded-md shadow-lg w-[90%] md:w-[50%] lg:w-[30%]">
        <h2 id="titulo-dialogo" className="text-2xl font-bold mb-4">
          {title}
        </h2>
        <p id="descricao-dialogo" className="mb-4">
          {message}
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="bg-secondary/20 hover:bg-secondary/30 text-foreground font-bold py-2 px-4 rounded"
            onClick={onCancel}
            aria-label="Cancelar operação"
          >
            Cancelar
          </button>
          <button
            className="bg-secondary hover:bg-secondary/80 text-white font-bold py-2 px-4 rounded"
            onClick={onConfirm}
            aria-label="Confirmar ação"
            data-testid="confirm-button"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
