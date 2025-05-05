import clsx from "clsx";
import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
import TaskDialog from "./task/TaskDialog";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import UserInfo from "./UserInfo";
import { IoMdAdd } from "react-icons/io";
import AddSubTask from "./task/AddSubTask";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='w-full h-fit bg-[#0f172a] shadow-md shadow-blue-600/30 p-4 rounded-xl border border-blue-700/30'>
        {/* Priority */}
        <div className='w-full flex justify-between'>
          <div
            className={clsx(
              "flex flex-1 gap-1 items-center text-sm font-medium",
              PRIOTITYSTYELS[task?.priority],
              "text-blue-400"
            )}
          >
            <span className='text-lg'>{ICONS[task?.priority]}</span>
            <span className='uppercase'>{task?.priority} Priority</span>
          </div>

          {user?.isAdmin && <TaskDialog task={task} />}
        </div>

        {/* Title and Date */}
        <div className='flex items-center gap-2 mt-3'>
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <h4 className='line-clamp-1 text-white font-medium'>{task?.title}</h4>
        </div>
        <span className='text-sm text-gray-400'>
          {formatDate(new Date(task?.date))}
        </span>

        {/* Divider */}
        <div className='w-full border-t border-blue-700/20 my-3' />

        {/* Activities, Files, Subtasks, Team */}
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center gap-4 text-blue-200'>
            <div className='flex gap-1 items-center text-sm'>
              <BiMessageAltDetail />
              <span>{task?.activities?.length}</span>
            </div>
            <div className='flex gap-1 items-center text-sm'>
              <MdAttachFile />
              <span>{task?.assets?.length}</span>
            </div>
            <div className='flex gap-1 items-center text-sm'>
              <FaList />
              <span>0/{task?.subTasks?.length}</span>
            </div>
          </div>

          <div className='flex flex-row-reverse'>
            {task?.team?.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1 ring-2 ring-blue-500/40",
                  BGS[index % BGS?.length]
                )}
              >
                <UserInfo user={m} />
              </div>
            ))}
          </div>
        </div>

        {/* Subtask Section */}
        {task?.subTasks?.length > 0 ? (
          <div className='py-3 border-t border-blue-700/20'>
            <h5 className='text-base line-clamp-1 text-white font-semibold'>
              {task?.subTasks[0].title}
            </h5>

            <div className='p-2 space-x-6'>
              <span className='text-sm text-gray-400'>
                {formatDate(new Date(task?.subTasks[0]?.date))}
              </span>
              <span className='bg-blue-500/20 px-3 py-1 rounded-full text-blue-300 font-medium'>
                {task?.subTasks[0].tag}
              </span>
            </div>
          </div>
        ) : (
          <div className='py-3 border-t border-blue-700/20'>
            <span className='text-gray-400 italic'>No Sub Task</span>
          </div>
        )}

        {/* Add Subtask Button */}
        <div className='w-full pt-1'>
          <button
            onClick={() => setOpen(true)}
            disabled={!user?.isAdmin}
            className='w-full flex gap-3 items-center text-sm text-blue-400 font-semibold disabled:cursor-not-allowed disabled:text-gray-600'
          >
            <IoMdAdd className='text-lg' />
            <span>Add Subtask</span>
          </button>
        </div>
      </div>

      {/* Modal for Add Subtask */}
      <AddSubTask open={open} setOpen={setOpen} id={task._id} />
    </>
  );
};

export default TaskCard;
