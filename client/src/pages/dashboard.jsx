import React from "react";
import {
  MdAdminPanelSettings,
} from "react-icons/md";
import { FaNewspaper, FaUsers } from "react-icons/fa"; 
import { FaArrowsToDot } from "react-icons/fa6";
import { LuClipboardEdit } from "react-icons/lu";
import { useGetDashboardStatusQuery } from "../redux/slices/api/taskApiSlice";
import Loading from "../components/Loader";
import TaskTable from "../components/dashboard/TaskTable";
import UserTable from "../components/dashboard/UserTable";
import PriorityChart from "../components/dashboard/PriorityChart";

const Card = ({ label, count, bg, icon }) => (
  <div className="w-full h-36 bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-5 shadow-lg rounded-2xl border border-indigo-400/20 hover:shadow-indigo-400/50 transition duration-300 hover:scale-105 hover:ring-2 hover:ring-indigo-400">
    <div className="h-full flex flex-1 flex-col justify-between">
      <p className="text-sm text-indigo-300">{label}</p>
      <span className="text-3xl font-bold text-white">{count}</span>
      <span className="text-xs text-gray-400">110 last month</span>
    </div>
    <div className={`absolute right-5 top-5 w-10 h-10 rounded-full flex items-center justify-center text-white ${bg} shadow-md`}>
      {icon}
    </div>
  </div>
);

const Dashboard = () => {
  const { data, isLoading, isError } = useGetDashboardStatusQuery();

  if (isLoading) return <Loading />;
  if (isError) return <div className="text-red-400 text-center mt-10">Error fetching dashboard. Please try again later.</div>;

  const totals = data?.tasks || {};

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: data?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-gradient-to-r from-pink-500 to-purple-600",
    },
    {
      _id: "2",
      label: "COMPLETED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-gradient-to-r from-green-500 to-teal-500",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS",
      total: totals["in progress"] || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-gradient-to-r from-yellow-500 to-orange-500",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"] || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-gradient-to-r from-blue-500 to-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen py-8 px-6 md:px-16 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#3B82F6] text-white">
      <h1 className="text-4xl font-bold mb-8 text-indigo-300 text-center tracking-wide">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <PriorityChart tasks={data?.tasks} />

      <div className="w-full flex flex-col md:flex-row gap-6 py-10">
        <TaskTable tasks={data?.tasks || []} />
        <UserTable users={data?.users || []} />
      </div>
    </div>
  );
};

export default Dashboard;
