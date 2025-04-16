import React from "react";
import { Chart } from "../Chart";

const PriorityChart = ({ tasks }) => {
  return (
    <div className="w-full bg-white my-16 p-4 rounded shadow-sm">
      <h4 className="text-xl text-gray-600 font-semibold">Chart by Priority</h4>
      <Chart tasks={tasks} /> {/* ✅ Pass tasks as prop */}
    </div>
  );
};

export default PriorityChart;
