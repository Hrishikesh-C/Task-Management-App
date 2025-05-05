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
    <div className="w-full p-4 rounded-xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#1e40af] shadow-lg">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="name"
            stroke="#CBD5E1"
            tick={{ fill: "#CBD5E1", fontSize: 12 }}
          />
          <YAxis
            stroke="#CBD5E1"
            tick={{ fill: "#CBD5E1", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1E293B",
              border: "1px solid #3B82F6",
              borderRadius: "8px",
              color: "#E0E7FF",
            }}
          />
          <Legend wrapperStyle={{ color: "#E0E7FF" }} />
          <Bar dataKey="total" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.7} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
