import { Popover, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  useGetNotificationsQuery,
  useMarkNotiAsReadMutation,
} from "../redux/slices/api/userApiSlice";
import ViewNotification from "../components/ViewNotification";

const ICONS = {
  alert: (
    <HiBellAlert className='h-5 w-5 text-indigo-300 group-hover:text-indigo-400' />
  ),
  message: (
    <BiSolidMessageRounded className='h-5 w-5 text-indigo-300 group-hover:text-indigo-400' />
  ),
};

const NotificationPanel = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const { data, refetch } = useGetNotificationsQuery();
  const [markAsRead] = useMarkNotiAsReadMutation();

  const readHandler = async (type, id) => {
    try {
      await markAsRead({ type, id }).unwrap();
      refetch();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const viewHandler = (el) => {
    setSelected(el);
    readHandler("one", el._id);
    setOpen(true);
  };

  const callsToAction = [
    { name: "Cancel", href: "#", icon: "" },
    {
      name: "Mark All Read",
      href: "#",
      icon: "",
      onClick: () => readHandler("all", ""),
    },
  ];

  return (
    <>
      <Popover className='relative'>
        <Popover.Button className='inline-flex items-center outline-none'>
          <div className='w-8 h-8 flex items-center justify-center text-indigo-300 relative'>
            <IoIosNotificationsOutline className='text-2xl' />
            {data?.length > 0 && (
              <span className='absolute text-center top-0 right-1 text-xs text-white font-semibold w-4 h-4 rounded-full bg-red-600'>
                {data?.length}
              </span>
            )}
          </div>
        </Popover.Button>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-1'
        >
          <Popover.Panel className='absolute -right-16 md:-right-2 z-10 mt-5 flex w-screen max-w-max px-4'>
            {({ close }) =>
              data?.length > 0 ? (
                <div className='w-screen max-w-md flex-auto overflow-hidden rounded-2xl bg-[#1e293b] text-sm leading-6 shadow-lg ring-1 ring-indigo-500/20'>
                  <div className='p-4'>
                    {data?.slice(0, 5).map((item, index) => (
                      <div
                        key={item._id + index}
                        className='group relative flex gap-x-4 rounded-xl p-4 hover:bg-[#334155] cursor-pointer transition'
                        onClick={() => viewHandler(item)}
                      >
                        <div className='mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-indigo-500/10 group-hover:bg-indigo-500/20'>
                          {ICONS[item.notiType] || ICONS.alert}
                        </div>

                        <div>
                          <div className='flex items-center gap-3 font-semibold text-white capitalize'>
                            <p>{item.notiType}</p>
                            <span className='text-xs font-normal text-indigo-300'>
                              {moment(item.createdAt).fromNow()}
                            </span>
                          </div>
                          <p className='line-clamp-1 mt-1 text-indigo-200'>
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className='grid grid-cols-2 divide-x divide-indigo-500/10 bg-[#0f172a]'>
                    {callsToAction.map((item) => (
                      <Link
                        key={item.name}
                        onClick={item?.onClick ? item.onClick : close}
                        className='flex items-center justify-center gap-x-2.5 p-3 font-semibold text-indigo-400 hover:bg-[#1e293b]'
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className='w-screen max-w-md flex-auto overflow-hidden rounded-2xl bg-[#1e293b] text-sm leading-6 shadow-lg ring-1 ring-indigo-500/20'>
                  <div className='p-4'>
                    <p className='text-center text-indigo-300'>
                      No notifications available.
                    </p>
                  </div>
                </div>
              )
            }
          </Popover.Panel>
        </Transition>
      </Popover>

      <ViewNotification open={open} setOpen={setOpen} el={selected} />
    </>
  );
};

export default NotificationPanel;
