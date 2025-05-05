import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskDetails from "./pages/TaskDetails";
import Tasks from "./pages/Tasks";
import Trash from "./pages/Trash";
import Users from "./pages/Users";
import Dashboard from "./pages/dashboard";
import Home from "./pages/HomeComponents/Home";
import { setOpenSidebar } from "./redux/slices/authSlice";
import Contact from "./pages/HomeComponents/contact";
import About from "./pages/HomeComponents/About";
import Faq from "./pages/HomeComponents/FAQ";
import Member from "./pages/HomeComponents/Member";
import UserGuide from "./pages/HomeComponents/UserGuide";
import Chatbot from "./pages/chatbot/Chatbot";

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className="flex h-screen w-full bg-[#0F172A] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="w-64 hidden md:block h-full bg-[#0C1125]">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Navbar />
        <div className="p-4 2xl:px-10 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/log-in" state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <Transition
      show={isSidebarOpen}
      as={Fragment}
      enter="transition-opacity duration-700"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-700"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        ref={(node) => (mobileMenuRef.current = node)}
        className={clsx(
          "md:hidden fixed inset-0 z-50 bg-black/40 transition-all duration-700"
        )}
        onClick={() => closeSidebar()}
      >
        <div
          className="bg-[#0C1125] w-3/4 h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full flex justify-end px-5 mt-5">
            <button
              onClick={closeSidebar}
              className="flex justify-end items-end"
            >
              <IoClose size={25} className="text-white" />
            </button>
          </div>

          <div className="-mt-10">
            <Sidebar />
          </div>
        </div>
      </div>
    </Transition>
  );
};

function App() {
  return (
    <main className="w-full min-h-screen bg-[#0F172A]">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/Member" element={<Member />} />
        <Route path="/guides" element={<UserGuide />} />

        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/completed/:status" element={<Tasks />} />
          <Route path="/in-progress/:status" element={<Tasks />} />
          <Route path="/todo/:status" element={<Tasks />} />
          <Route path="/team" element={<Users />} />
          <Route path="/trashed" element={<Trash />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Route>
      </Routes>
      <Toaster richColors />
    </main>
  );
}

export default App;
