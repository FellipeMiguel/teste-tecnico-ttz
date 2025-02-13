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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-background p-5 rounded-md shadow-lg w-[90%] md:w-[50%] lg:w-[30%]">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            className="bg-secondary/20 hover:bg-secondary/30 text-foreground font-bold py-2 px-4 rounded"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            className="bg-secondary hover:bg-secondary/80 text-white font-bold py-2 px-4 rounded"
            onClick={onConfirm}
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
