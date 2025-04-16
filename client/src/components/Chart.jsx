import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Chart = ({ tasks }) => {
  // Convert raw tasks object into chart data
  const chartData = [
    { name: "Completed", total: tasks?.["completed"] || 0 },
    { name: "In Progress", total: tasks?.["in progress"] || 0 },
    { name: "Todo", total: tasks?.["todo"] || 0 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
