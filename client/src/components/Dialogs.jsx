import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { FaQuestion } from "react-icons/fa";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";

export default function ConfirmatioDialog({
  open,
  setOpen,
  msg,
  setMsg = () => {},
  onClick = () => {},
  type = "delete",
  setType = () => {},
}) {
  const closeDialog = () => {
    setType("delete");
    setMsg(null);
    setOpen(false);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={closeDialog}>
        <div className='py-6 px-4 w-full flex flex-col gap-6 items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#1e40af] rounded-xl shadow-lg'>
          <Dialog.Title as='h3'>
            <p
              className={clsx(
                "p-4 rounded-full text-white shadow-md",
                type === "restore" || type === "restoreAll"
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                  : "bg-gradient-to-r from-pink-500 to-purple-600"
              )}
            >
              <FaQuestion size={60} />
            </p>
          </Dialog.Title>

          <p className='text-center text-gray-300 text-sm md:text-base'>
            {msg ?? "Are you sure you want to delete the selected record?"}
          </p>

          <div className='flex gap-4 mt-2'>
            <Button
              type='button'
              className={clsx(
                "px-6 py-2 text-sm font-semibold text-white rounded-md shadow",
                type === "restore" || type === "restoreAll"
                  ? "bg-gradient-to-r from-yellow-500 to-yellow-700"
                  : "bg-gradient-to-r from-pink-600 to-purple-700"
              )}
              onClick={onClick}
              label={type === "restore" || type === "restoreAll" ? "Restore" : "Delete"}
            />

            <Button
              type='button'
              className='bg-white px-6 py-2 text-sm font-semibold text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 transition'
              onClick={() => closeDialog()}
              label='Cancel'
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}

export function UserAction({ open, setOpen, onClick = () => {} }) {
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={closeDialog}>
        <div className='py-6 px-4 w-full flex flex-col gap-6 items-center justify-center bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#1e40af] rounded-xl shadow-lg'>
          <Dialog.Title as='h3'>
            <p className='p-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'>
              <FaQuestion size={60} />
            </p>
          </Dialog.Title>

          <p className='text-center text-gray-300 text-sm md:text-base'>
            Are you sure you want to activate or deactivate this account?
          </p>

          <div className='flex gap-4 mt-2'>
            <Button
              type='button'
              className='px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-700 rounded-md shadow'
              onClick={onClick}
              label='Yes'
            />

            <Button
              type='button'
              className='bg-white px-6 py-2 text-sm font-semibold text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 transition'
              onClick={() => closeDialog()}
              label='No'
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}
