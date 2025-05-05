import clsx from "clsx";
import React from "react";
import { IoMdAdd } from "react-icons/io";

const TaskTitle = ({ label, className }) => {
  return (
    <div className='w-full h-10 md:h-12 px-2 md:px-4 rounded-xl bg-[#0f172a] border border-blue-700/40 shadow-md shadow-blue-600/30 flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <div className={clsx("w-4 h-4 rounded-full", className)} />
        <p className='text-sm md:text-base text-blue-300 font-medium'>{label}</p>
      </div>

      <button className='hidden md:block hover:scale-110 transition-transform duration-200'>
        <IoMdAdd className='text-lg text-blue-400' />
      </button>
    </div>
  );
};

export default TaskTitle;
