import React from "react";

const ProgressBar = ({ percent }) => (
  <div className="relative w-full bg-[#c0e3eb] rounded-full h-4">
    <div
      className="bg-[#0094B5] rounded-full h-4"
      style={{ width: `${percent}%` }}
    ></div>
    <span className="absolute top-1/2 left-[50%] transform -translate-y-1/2 -translate-x-1/2 text-xs">
      {percent}%
    </span>
  </div>
);

const Entrega = ({ name, percent }) => (
  <li className="text-sm text-gray-400 flex justify-between">
    {name} <span>{percent}%</span>
  </li>
);

const KeyResult = ({ title, percent, entregas }) => (
  <div className="mb-4">
    <h2 className="font-bold mb-2">{title}</h2>
    <ProgressBar percent={percent} />
    <ul className="mt-2 flex flex-col gap-2">
      {entregas.map((entrega, index) => (
        <Entrega key={index} name={entrega.name} percent={entrega.percent} />
      ))}
    </ul>
  </div>
);

const Panel = ({ objetivo }) => (
  <div className="w-full md:w-[49%]">
    <div className="bg-white p-5 rounded-md shadow-sm ">
      <h2 className="font-bold mb-2">{objetivo.title}</h2>
      <ProgressBar percent={objetivo.percent} />
      <div className="flex items-center justify-between py-3">
        <hr className="text-black w-[40%]" />
        <h3 className="text-gray-400 text-sm">Resultados-Chave</h3>
        <hr className="text-black w-[40%]" />
      </div>
      {objetivo.keyResults.map((keyResult, index) => (
        <KeyResult key={index} {...keyResult} />
      ))}
      <div className="flex justify-end">
        <button className="text-[#0094B5] hover:underline mt-1">
          + Adicionar Resultado-Chave
        </button>
      </div>
    </div>
  </div>
);

export default Panel;
