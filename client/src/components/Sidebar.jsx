import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";

const linkData = [
  { label: "Dashboard", link: "dashboard", icon: <MdDashboard /> },
  { label: "Tasks", link: "tasks", icon: <FaTasks /> },
  { label: "Completed", link: "completed/completed", icon: <MdTaskAlt /> },
  { label: "In Progress", link: "in-progress/in progress", icon: <MdOutlinePendingActions /> },
  { label: "To Do", link: "todo/todo", icon: <MdOutlinePendingActions /> },
  { label: "Team", link: "team", icon: <FaUsers /> },
  { label: "Trash", link: "trashed", icon: <FaTrashAlt /> },
  { label: "ChatBot", link: "chatbot", icon: <MdOutlinePendingActions /> },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const sidebarLinks = user?.isAdmin === true ? linkData : linkData.slice(0, 5);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => (
    <Link
      to={el.link}
      onClick={closeSidebar}
      className={clsx(
        "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-base transition-all duration-300",
        path === el.link.split("/")[0]
          ? "bg-[#0f172a] text-cyan-300 shadow-lg"
          : "text-gray-300 hover:bg-[#1e293b] hover:text-cyan-400"
      )}
    >
      {el.icon}
      <span>{el.label}</span>
    </Link>
  );

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5 bg-[#020617] text-white">
      <h1 className="flex gap-2 items-center">
        <p className="bg-gradient-to-tr from-cyan-400 to-blue-600 p-2 rounded-full shadow-md">
          <MdOutlineAddTask className="text-white text-2xl font-black" />
        </p>
        <span className="text-2xl font-bold text-cyan-300 drop-shadow">TaskMe</span>
      </h1>

      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      {/* Future Settings Button */}
      {/* 
      <div>
        <button className="w-full flex gap-2 p-2 items-center text-lg text-gray-400 hover:text-cyan-400">
          <MdSettings />
          <span>Settings</span>
        </button>
      </div> 
      */}
    </div>
  );
};

export default Sidebar;
