import React, { useState, useEffect } from "react";

const CreateKeyResultModal = ({
  isOpen,
  onClose,
  onSave,
  keyResult: initialKeyResult,
}) => {
  const [keyResult, setKeyResult] = useState({
    title: "",
    percent: "",
    deliveries: [],
  });
  const [newDelivery, setNewDelivery] = useState({ name: "", percent: "" });

  useEffect(() => {
    setKeyResult(
      initialKeyResult || { title: "", percent: "", deliveries: [] }
    );
  }, [initialKeyResult]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKeyResult((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeliveryChange = (index, e) => {
    const { name, value } = e.target;
    setKeyResult((prev) => {
      const updatedDeliveries = [...prev.deliveries];
      const newValue =
        name === "percent"
          ? value === ""
            ? ""
            : Math.max(0, Math.min(100, Number(value)))
          : value;
      updatedDeliveries[index] = {
        ...updatedDeliveries[index],
        [name]: newValue,
      };
      return { ...prev, deliveries: updatedDeliveries };
    });
  };

  const addDelivery = () => {
    const validPercent =
      newDelivery.percent === ""
        ? ""
        : Math.max(0, Math.min(100, Number(newDelivery.percent)));
    setKeyResult((prev) => ({
      ...prev,
      deliveries: [
        ...prev.deliveries,
        { ...newDelivery, percent: validPercent },
      ],
    }));
    setNewDelivery({ name: "", percent: "" });
  };

  const deleteDelivery = (index) => {
    setKeyResult((prev) => ({
      ...prev,
      deliveries: prev.deliveries.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    onSave(keyResult);
    setKeyResult({ title: "", percent: "", deliveries: [] });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-background p-5 rounded-md shadow-lg w-[90%] md:w-[50%] lg:w-[30%]">
        <h2 className="text-2xl font-bold mb-4">
          {initialKeyResult
            ? "Editar Resultado-Chave"
            : "Criar Novo Resultado-Chave"}
        </h2>

        <div className="mb-4">
          <input
            type="text"
            name="title"
            className="appearance-none border rounded w-full py-2 px-3 text-foreground bg-background leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Digite o resultado-chave"
            value={keyResult.title}
            onChange={handleChange}
          />
        </div>

        {keyResult.deliveries.map((delivery, index) => (
          <div key={index} className="mb-4 flex gap-1 items-center">
            <input
              type="text"
              name="name"
              className="appearance-none border rounded w-full py-2 px-3 text-foreground bg-background leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Digite a entrega"
              value={delivery.name}
              onChange={(e) => handleDeliveryChange(index, e)}
            />
            <input
              type="number"
              name="percent"
              className="appearance-none border rounded py-2 px-3 text-foreground bg-background leading-tight focus:outline-none focus:shadow-outline w-1/3"
              placeholder="Valor %"
              value={delivery.percent}
              onChange={(e) => handleDeliveryChange(index, e)}
            />
            <button
              className="w-1/3 bg-secondary hover:bg-secondary/80 text-white rounded py-2 px-3"
              onClick={() => deleteDelivery(index)}
            >
              Delete
            </button>
          </div>
        ))}

        <div className="mb-4 flex justify-end">
          <button
            className="text-blue-400 hover:underline"
            onClick={addDelivery}
          >
            + Adicionar Entrega
          </button>
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="bg-secondary/20 hover:bg-secondary/30 text-foreground font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
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

export default CreateKeyResultModal;
