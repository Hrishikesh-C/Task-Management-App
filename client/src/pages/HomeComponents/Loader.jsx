import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#0F172A] text-indigo-300">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500 border-opacity-50" />
    </div>
  );
};

export default Loader;
