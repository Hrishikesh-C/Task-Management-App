import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
import { useGetAllTaskQuery } from "../redux/slices/api/taskApiSlice";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-gradient-to-r from-blue-500 to-blue-700 text-white",
  "in progress": "bg-gradient-to-r from-yellow-500 to-yellow-700 text-white",
  completed: "bg-gradient-to-r from-green-500 to-green-700 text-white",
};

const Tasks = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  const status = params?.status || "";

  // Call the get all tasks query
  const { data, isLoading, refetch } = useGetAllTaskQuery({
    strQuery: status || '', // Use status if it is available, else send an empty string
    isTrashed: false,
    search: '',
  });

  // Log data to see if it's populated
  console.log("Fetched data from API:", data);

  return isLoading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full bg-gradient-to-tl from-gray-800 via-gray-900 to-black text-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5 hover:bg-blue-700 transition-all"
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
            <TaskTitle label="To Do" className={TASK_TYPE.todo} />
            <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]} />
            <TaskTitle label="Completed" className={TASK_TYPE.completed} />
          </div>
        )}

        {selected !== 1 ? (
          <BoardView tasks={data?.tasks || []} />
        ) : (
          <div className="w-full">
            <Table tasks={data?.tasks || []} />
          </div>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen} refetch={refetch} />
    </div>
  );
};

export default Tasks;
