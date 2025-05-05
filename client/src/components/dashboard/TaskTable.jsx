import React from "react";
import clsx from "clsx";
import moment from "moment";
import { TASK_TYPE, PRIOTITYSTYELS, BGS } from "../../utils";
import UserInfo from "../UserInfo";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskTable = ({ tasks }) => {
  return (
    <div className="w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-lg rounded-xl">
      <table className="w-full">
        <thead className="border-b border-gray-300">
          <tr className="text-black text-left">
            <th className="py-2">Task Title</th>
            <th className="py-2">Priority</th>
            <th className="py-2">Team</th>
            <th className="py-2 hidden md:block">Created At</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.length > 0 ? (
            tasks.map((task, id) => (
              <tr key={id} className="border-b border-gray-200 hover:bg-indigo-50 transition">
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])} />
                    <p className="text-base font-medium text-gray-800">{task.title}</p>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex gap-1 items-center">
                    <span className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}>
                      {ICONS[task.priority]}
                    </span>
                    <span className="capitalize text-sm">{task.priority}</span>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex">
                    {task.team?.map((m, index) => (
                      <div
                        key={index}
                        className={clsx(
                          "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1 border-2 border-white shadow-sm",
                          BGS[index % BGS.length]
                        )}
                      >
                        <UserInfo user={m} />
                      </div>
                    ))}
                  </div>
                </td>
                <td className="py-3 hidden md:block">
                  <span className="text-sm text-gray-500">
                    {moment(task?.date).fromNow()}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-4 text-center text-gray-500">
                No tasks available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
