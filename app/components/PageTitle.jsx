import React from "react";
import { BsLayoutSidebar } from "react-icons/bs";

const PageTitle = () => {
  return (
    <div className="flex items-center gap-2">
      <BsLayoutSidebar className="text-white" />
      <span className="text-white mb-1">|</span>
      <h1 className="font-bold">Lista de OKRs</h1>
    </div>
  );
};

export default PageTitle;
