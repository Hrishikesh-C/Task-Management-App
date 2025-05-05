import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import UserAvatar from "./UserAvatar";
import NotificationPanel from "./NotificationPanel";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className='flex justify-between items-center bg-gradient-to-r from-[#0F172A] to-[#1E293B] px-4 py-3 2xl:py-4 sticky z-10 top-0 shadow-lg border-b border-indigo-400/20'>
      <div className='flex gap-4'>
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className='text-2xl text-indigo-300 block md:hidden hover:text-white transition duration-200'
        >
          ☰
        </button>

        <div className='w-64 2xl:w-[400px] flex items-center py-2 px-4 gap-3 rounded-full bg-[#1E293B] border border-indigo-400/30'>
          <MdOutlineSearch className='text-indigo-300 text-xl' />

          <input
            type='text'
            placeholder='Search...'
            className='flex-1 outline-none bg-transparent placeholder:text-indigo-400 text-white'
          />
        </div>
      </div>

      <div className='flex gap-3 items-center'>
        <NotificationPanel />

        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
