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
  <div className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between">
    <div className="h-full flex flex-1 flex-col justify-between">
      <p className="text-base text-gray-600">{label}</p>
      <span className="text-2xl font-semibold">{count}</span>
      <span className="text-sm text-gray-400">110 last month</span>
    </div>
    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${bg}`}>
      {icon}
    </div>
  </div>
);

const Dashboard = () => {
  const { data, isLoading, isError, error } = useGetDashboardStatusQuery();

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching dashboard. Please try again later.</div>;

  const totals = data?.tasks || {};

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: data?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-gradient-to-r from-pink-600 to-purple-600",
    },
    {
      _id: "2",
      label: "COMPLETED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-gradient-to-r from-green-600 to-teal-600",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS",
      total: totals["in progress"] || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-gradient-to-r from-yellow-600 to-orange-600",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"] || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-gradient-to-r from-blue-600 to-indigo-600",
    },
  ];

  return (
    <div className="h-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats?.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <PriorityChart tasks={data?.tasks} />

      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
        {/* <TaskTable tasks={data?.tasks?.last10Task || []} /> */}
        <TaskTable tasks={data?.tasks || []} />

        <UserTable users={data?.users || []} />
      </div>
    </div>
  );
};

export default Dashboard;
