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
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setKeyResult(
        initialKeyResult || { title: "", percent: "", deliveries: [] }
      );
      setNewDelivery({ name: "", percent: "" });
    }
  }, [isOpen, initialKeyResult]);

  useEffect(() => {
    return () => {
      setKeyResult({ title: "", percent: "", deliveries: [] });
      setNewDelivery({ name: "", percent: "" });
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "percent" && (value < 0 || value > 100)) {
      setError("O valor da porcentagem deve estar entre 0 e 100");
    } else if (name === "percent" && isNaN(value)) {
      setError("O valor da porcentagem deve ser um número");
    } else {
      setError("");
      setKeyResult((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDeliveryChange = (index, e) => {
    const { name, value } = e.target;
    setError("");

    setKeyResult((prev) => {
      const updatedDeliveries = [...prev.deliveries];
      updatedDeliveries[index] = {
        ...updatedDeliveries[index],
        [name]: value,
      };
      return { ...prev, deliveries: updatedDeliveries };
    });
    updatePercent();
  };

  const addDelivery = () => {
    if (newDelivery.name.trim() && newDelivery.percent.trim()) {
      const parsedPercent = parseFloat(newDelivery.percent);

      if (parsedPercent < 0 || parsedPercent > 100) {
        setError("O valor da porcentagem deve estar entre 0 e 100");
      } else if (isNaN(parsedPercent)) {
        setError("O valor da porcentagem deve ser um número");
      } else {
        setError("");
        setKeyResult((prev) => ({
          ...prev,
          deliveries: [
            ...prev.deliveries,
            {
              name: newDelivery.name,
              percent: parsedPercent > 100 ? 100 : parsedPercent,
            },
          ],
        }));
        setNewDelivery({ name: "", percent: "" });
        updatePercent();
      }
    } else {
      setError("Os campos de entrega e porcentagem não podem estar vazios");
    }
  };

  const deleteDelivery = (index) => {
    setKeyResult((prev) => ({
      ...prev,
      deliveries: prev.deliveries.filter((_, i) => i !== index),
    }));
    updatePercent();
  };

  const updatePercent = () => {
    const validDeliveries = keyResult.deliveries.map((d) => ({
      ...d,
      percent: d.percent || 0,
    }));

    const averagePercent =
      validDeliveries.length > 0
        ? validDeliveries.reduce(
            (acc, d) => acc + parseFloat(d.percent || 0),
            0
          ) / validDeliveries.length
        : 0;

    setKeyResult((prev) => ({
      ...prev,
      percent: averagePercent,
    }));
  };

  const handleSave = () => {
    const hasEmptyFields = keyResult.deliveries.some(
      (delivery) => !delivery.name.trim() || isNaN(parseFloat(delivery.percent))
    );

    if (hasEmptyFields) {
      setError(
        "Todos os campos de entrega e porcentagem devem estar preenchidos"
      );
    } else if (!error) {
      const sanitizedDeliveries = keyResult.deliveries.map((d) => ({
        ...d,
        percent: parseFloat(d.percent),
      }));
      onSave({ ...keyResult, deliveries: sanitizedDeliveries });
      onClose();
    }
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
              placeholder="Valor%"
              value={delivery.percent}
              onChange={(e) => handleDeliveryChange(index, e)}
              min="0"
              max="100"
            />
            <button
              className="w-1/3 bg-secondary hover:bg-secondary/80 text-white rounded py-2 px-3"
              onClick={() => deleteDelivery(index)}
            >
              Deletar
            </button>
          </div>
        ))}
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4 flex gap-1 items-center">
          <input
            type="text"
            placeholder="Nova entrega"
            value={newDelivery.name}
            onChange={(e) =>
              setNewDelivery({ ...newDelivery, name: e.target.value })
            }
            className="appearance-none border rounded w-full py-2 px-3 text-foreground bg-background leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="number"
            placeholder="Valor%"
            value={newDelivery.percent}
            onChange={(e) =>
              setNewDelivery({ ...newDelivery, percent: e.target.value })
            }
            min="0"
            max="100"
            className="appearance-none border rounded py-2 px-3 text-foreground bg-background leading-tight focus:outline-none focus:shadow-outline w-1/3"
          />
          <button
            className="w-1/3 bg-secondary hover:bg-secondary/80 text-white rounded py-2 px-3"
            onClick={addDelivery}
          >
            Adicionar
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
