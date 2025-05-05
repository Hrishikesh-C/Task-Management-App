import React, { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { getInitials } from "../utils";
import clsx from "clsx";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import AddUser from "../components/AddUser";
import {
  useDeleteUserMutation,
  useGetTeamListQuery,
  useUserActionMutation,
} from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";

const Users = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data, isLoading, refetch } = useGetTeamListQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [userAction] = useUserActionMutation();

  const userActionHandler = async () => {
    try {
      const result = await userAction({
        isActive: !selected?.isActive,
        id: selected?._id,
      });

      refetch();
      toast.success(result.data?.message);
      setSelected(null);
      setTimeout(() => {
        setOpenAction(false);
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteHandler = async () => {
    try {
      await deleteUser(selected);
      refetch();
      toast.success("Deleted successfully");
      setSelected(null);
      setTimeout(() => {
        setOpenDialog(false);
      }, 500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelected(el);
    setOpen(true);
  };

  const userStatusClick = (el) => {
    setSelected(el);
    setOpenAction(true);
  };

  const TableHeader = () => (
    <thead className="border-b border-indigo-400/20">
      <tr className="text-indigo-300 text-left text-sm">
        <th className="py-3">Full Name</th>
        <th className="py-3">Title</th>
        <th className="py-3">Email</th>
        <th className="py-3">Role</th>
        <th className="py-3">Active</th>
        <th className="py-3 text-right">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user }) => (
    <tr className="border-b border-indigo-400/10 hover:bg-indigo-900/30 transition text-indigo-100 text-sm">
      <td className="p-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md">
            {getInitials(user.name)}
          </div>
          {user.name}
        </div>
      </td>
      <td className="p-3">{user.title}</td>
      <td className="p-3">{user.email || "user.email.com"}</td>
      <td className="p-3">{user.role}</td>
      <td className="p-3">
        <button
          onClick={() => userStatusClick(user)}
          className={clsx(
            "px-4 py-1 rounded-full text-xs font-semibold",
            user?.isActive
              ? "bg-green-600 text-white hover:bg-green-500"
              : "bg-yellow-500 text-black hover:bg-yellow-400"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </button>
      </td>
      <td className="p-3 flex gap-3 justify-end">
        <Button
          className="text-indigo-300 hover:text-indigo-100 transition font-semibold"
          label="Edit"
          type="button"
          onClick={() => editClick(user)}
        />
        <Button
          className="text-red-400 hover:text-red-200 transition font-semibold"
          label="Delete"
          type="button"
          onClick={() => deleteClick(user?._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className="min-h-screen py-10 px-6 md:px-12 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#3B82F6] text-white">
        <div className="flex items-center justify-between mb-8">
          <Title title="Team Members" className="text-indigo-300 text-3xl font-bold" />
          <Button
            label="Add New User"
            icon={<IoMdAdd className="text-lg" />}
            className="flex gap-2 items-center bg-indigo-600 hover:bg-indigo-500 transition text-white rounded-md px-4 py-2 shadow-lg"
            onClick={() => setOpen(true)}
          />
        </div>

        <div className="bg-[#1E293B] p-4 rounded-2xl shadow-lg border border-indigo-400/20">
          <div className="overflow-x-auto">
            <table className="w-full">
              <TableHeader />
              <tbody>
                {data?.map((user, index) => (
                  <TableRow key={index} user={user} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddUser
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
    </>
  );
};

export default Users;
