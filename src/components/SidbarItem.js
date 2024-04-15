import React from "react";

function SidbarItem({ name, active, handleclick }) {
  return <button className={`sidebar-item ${active ? "active" : ""} p-1 md:p-3 bg-blue-300 rounded-md m-2 `} onClick={handleclick}>
    {name}
  </button>;
}

export default SidbarItem;
