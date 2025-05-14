import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, type: "spring" },
  }),
};

const HeroSection = () => (
  <section className="px-6 md:px-16 py-20 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
    <motion.div className="max-w-xl" initial="hidden" animate="visible" variants={fadeInUp} custom={0}>
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
        Your Smart{" "}
        <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
          Task Assistant
        </span>
      </h1>
      <p className="mt-6 text-lg text-gray-300">
        Manage tasks, set reminders, and boost productivity — all through natural conversation.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to="/register"
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-8 py-3 rounded-2xl font-semibold shadow-lg transition-transform hover:scale-105"
        >
          Get Started
        </Link>
        <a
          href="#features"
          className="border-2 border-indigo-400 px-8 py-3 rounded-2xl text-indigo-300 hover:bg-indigo-600 hover:text-white transition-transform hover:scale-105"
        >
          Explore Features
        </a>
      </div>
    </motion.div>
    <motion.img
      src="https://cdn3d.iconscout.com/3d/premium/thumb/task-management-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--board-time-schedule-working-organization-organizing-project-pack-people-illustrations-3831627.png"
      alt="3D Task Management Illustration"
      loading="lazy"
      className="max-w-sm w-full drop-shadow-2xl rounded-xl"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      whileHover={{ scale: 1.05, rotate: 2 }}
    />
  </section>
);

export default HeroSection;
