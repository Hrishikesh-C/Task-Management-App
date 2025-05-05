import clsx from "clsx";
import React, { useState } from "react";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
} from "react-icons/md";
import { useDeleteRestoreTaskMutation, useGetAllTaskQuery } from "../redux/slices/api/taskApiSlice";
import Title from "../components/Title";
import Button from "../components/Button";
import AddUser from "../components/AddUser";
import ConfirmatioDialog from "../components/Dialogs";
import Loading from "../components/Loader.jsx";
import { toast } from "sonner";
import { PRIOTITYSTYELS, TASK_TYPE } from "../utils";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Trash = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");

  const { data, isLoading, refetch } = useGetAllTaskQuery({
    strQuery: "",
    isTrashed: "true",
    search: "",
  });

  const [deleteRestoreTask] = useDeleteRestoreTaskMutation();

  const deleteRestoreHandler = async () => {
    try {
      let result;

      switch (type) {
        case "delete":
          result = await deleteRestoreTask({ id: selected, actionType: "delete" }).unwrap();
          break;
        case "deleteAll":
          result = await deleteRestoreTask({ id: selected, actionType: "deleteAll" }).unwrap();
          break;
        case "restore":
          result = await deleteRestoreTask({ id: selected, actionType: "restore" }).unwrap();
          break;
        case "restoreAll":
          result = await deleteRestoreTask({ id: selected, actionType: "restoreAll" }).unwrap();
          break;
        default:
          break;
      }

      toast.success(result?.message);
      setTimeout(() => {
        setOpenDialog(false);
        refetch();
      }, 500);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permanently delete all items?");
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("Do you want to restore all items in the trash?");
    setOpenDialog(true);
  };

  const deleteClick = (id) => {
    setType("delete");
    setSelected(id);
    setOpenDialog(true);
  };

  const restoreClick = (id) => {
    setSelected(id);
    setType("restore");
    setMsg("Do you want to restore the selected item?");
    setOpenDialog(true);
  };

  if (isLoading)
    return (
      <div className="py-10">
        <Loading />
      </div>
    );

  const TableHeader = () => (
    <thead className="border-b border-indigo-600">
      <tr className="text-indigo-300 text-left text-sm uppercase tracking-wide">
        <th className="py-3">Task Title</th>
        <th className="py-3">Priority</th>
        <th className="py-3">Stage</th>
        <th className="py-3">Modified On</th>
        <th className="py-3 text-right">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ item }) => (
    <tr className="border-b border-indigo-200/10 hover:bg-indigo-600/10 transition">
      <td className="py-3 text-white">
        <div className="flex items-center gap-2">
          <div className={clsx("w-4 h-4 rounded-full", TASK_TYPE[item?.stage])} />
          <p className="line-clamp-2">{item?.title}</p>
        </div>
      </td>
      <td className="py-3 capitalize">
        <div className="flex gap-1 items-center">
          <span className={clsx("text-lg", PRIOTITYSTYELS[item?.priority])}>
            {ICONS[item?.priority]}
          </span>
          <span className="text-white">{item?.priority}</span>
        </div>
      </td>
      <td className="py-3 capitalize">{item?.stage}</td>
      <td className="py-3 text-sm text-gray-400">{new Date(item?.date).toDateString()}</td>
      <td className="py-3 flex gap-2 justify-end">
        <Button
          icon={<MdOutlineRestore className="text-xl text-green-400" />}
          onClick={() => restoreClick(item._id)}
        />
        <Button
          icon={<MdDelete className="text-xl text-red-500" />}
          onClick={() => deleteClick(item._id)}
        />
      </td>
    </tr>
  );

  return (
    <div className="min-h-screen py-8 px-6 md:px-16 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#3B82F6] text-white">
      <h1 className="text-3xl font-semibold text-indigo-300 text-center mb-10 tracking-wide">
        Trashed Tasks
      </h1>

      <div className="flex justify-end gap-4 mb-6">
        <Button
          label="Restore All"
          icon={<MdOutlineRestore className="text-lg" />}
          className="flex gap-2 items-center text-sm md:text-base rounded-md px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 hover:scale-105 transition"
          onClick={restoreAllClick}
        />
        <Button
          label="Delete All"
          icon={<MdDelete className="text-lg" />}
          className="flex gap-2 items-center text-sm md:text-base rounded-md px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition"
          onClick={deleteAllClick}
        />
      </div>

      <div className="bg-[#1E293B] rounded-xl shadow-xl border border-indigo-400/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHeader />
            <tbody>
              {data?.tasks?.map((tk, id) => (
                <TableRow key={id} item={tk} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddUser open={open} setOpen={setOpen} />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={deleteRestoreHandler}
      />
    </div>
  );
};

export default Trash;
