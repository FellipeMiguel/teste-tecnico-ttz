import React from "react";
import { BsLayoutSidebar } from "react-icons/bs";

export const PageTitle = () => {
  return (
    <div className="flex items-center gap-2">
      <BsLayoutSidebar className="text-gray-300" />
      <span className="text-gray-300 mb-1">|</span>
      <h1 className="font-bold">Lista de OKRs</h1>
    </div>
  );
};
