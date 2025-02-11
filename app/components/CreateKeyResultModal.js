import React, { useState } from "react";

const CreateKeyResultModal = ({ isOpen, onClose, onSave }) => {
  const [keyResult, setKeyResult] = useState({
    title: "",
    percent: 0,
    deliveries: [],
  });
  const [newDelivery, setNewDelivery] = useState({ name: "", percent: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKeyResult((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setNewDelivery((prev) => ({ ...prev, [name]: value }));
  };

  const addDelivery = () => {
    setKeyResult((prev) => ({
      ...prev,
      deliveries: [...prev.deliveries, newDelivery],
    }));
    setNewDelivery({ name: "", percent: 0 });
  };

  const handleSave = () => {
    onSave(keyResult);
    setKeyResult({ title: "", percent: 0, deliveries: [] });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-md shadow-lg w-[90%] md:w-[50%] lg:w-[30%]">
        <h2 className="text-2xl font-bold mb-4">Criar Novo Resultado-Chave</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nome do Resultado-Chave
          </label>
          <input
            type="text"
            name="title"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Digite o resultado-chave"
            value={keyResult.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Percentual
          </label>
          <input
            type="number"
            name="percent"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Digite o percentual"
            value={keyResult.percent}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nome da Entrega
          </label>
          <input
            type="text"
            name="name"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Digite a entrega"
            value={newDelivery.name}
            onChange={handleDeliveryChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Percentual da Entrega
          </label>
          <input
            type="number"
            name="percent"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Digite o percentual"
            value={newDelivery.percent}
            onChange={handleDeliveryChange}
          />
        </div>
        <div className="mb-4 flex justify-end">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded"
            onClick={addDelivery}
          >
            + Adicionar Entrega
          </button>
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

export default CreateKeyResultModal;
