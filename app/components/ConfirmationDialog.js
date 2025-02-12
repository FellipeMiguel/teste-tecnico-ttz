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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white p-5 rounded-md shadow-sm w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
            onClick={onConfirm}
          >
            Confirmar
          </button>
          <button
            className="bg-gray-500 text-white py-1 px-3 rounded-md hover:bg-gray-600"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
