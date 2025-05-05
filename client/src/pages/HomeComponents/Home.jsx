import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaUserFriends,
  FaTasks,
  FaBell,
  FaCogs,
} from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, type: "spring" },
  }),
};

const Home = () => {
  const features = [
    {
      icon: <FaTasks />,
      title: "Task Dashboard",
      description:
        "Organize to-dos visually with intuitive boards and smart priorities that adapt to your workflow.",
    },
    {
      icon: <FaUserFriends />,
      title: "Team Collaboration",
      description:
        "Assign tasks, tag teammates, and track updates in real-time—built for remote and hybrid teams.",
    },
    {
      icon: <FaBell />,
      title: "Smart Notifications",
      description:
        "Receive context-aware alerts so you stay focused on what matters most.",
    },
    {
      icon: <FaRocket />,
      title: "Productivity Boosters",
      description:
        "Use Pomodoro timers, AI insights, and custom goals to maximize efficiency.",
    },
    {
      icon: <FaCogs />,
      title: "Advanced Settings",
      description:
        "Personalize your environment, toggle dark mode, and fine-tune integrations.",
    },
  ];

  const footerLinks = [
    { section: "About", links: ["Our Story", "Team", "Contact Us"] },
    { section: "Support", links: ["Help Center", "User Guides"] },
    { section: "Features", links: ["Task Boards", "Get Started", "Login"] },
    { section: "Legal", links: ["Privacy Policy", "Terms of Service"] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#3B82F6] text-white font-sans overflow-x-hidden relative">
      {/* Radial Grid Overlay */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:30px_30px] animate-spin-slower" />

      {/* Navbar */}
      <motion.nav
        className="flex justify-between items-center px-8 py-5 bg-white/10 shadow-md backdrop-blur-md sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
          TaskBot
        </div>
        <div className="flex items-center gap-8 text-sm font-medium text-white">
          <Link to="/contact" className="hover:text-indigo-300 transition duration-300">Contact</Link>
          <Link to="/log-in" className="hover:text-indigo-300 transition duration-300">Login</Link>
          <Link to="/register" className="hover:text-indigo-300 transition duration-300">Register</Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="px-6 md:px-16 py-20 flex flex-col md:flex-row justify-between items-center gap-16">
        <motion.div
          className="max-w-xl"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={0}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Your Smart{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 text-transparent bg-clip-text">
              Task Assistant
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-300">
            Manage tasks, set reminders, and boost productivity — all through natural conversation.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-8 py-3 rounded-2xl text-white font-semibold shadow-lg shadow-indigo-700/50 transition duration-300 transform hover:scale-105"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="border-2 border-indigo-400 px-8 py-3 rounded-2xl text-indigo-300 hover:bg-indigo-600 hover:text-white transition duration-300 transform hover:scale-105"
            >
              Explore Features
            </a>
          </div>
        </motion.div>
        <motion.img
          src="https://cdn3d.iconscout.com/3d/premium/thumb/task-management-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--board-time-schedule-working-organization-organizing-project-pack-people-illustrations-3831627.png"
          alt="Task Management AI"
          loading="lazy"
          className="w-full max-w-sm drop-shadow-2xl rounded-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        />
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 md:px-16 py-20 bg-gradient-to-br from-[#1E293B] to-[#0F172A]">
        <h2 className="text-4xl font-semibold mb-14 text-center text-indigo-300">
          Core Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-indigo-500/20 p-6 rounded-2xl shadow-lg hover:shadow-indigo-400/50 transition duration-300 hover:scale-105 hover:ring-2 hover:ring-indigo-400"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4 text-indigo-300 text-3xl">
                {feature.icon}
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-gray-400 pt-12 pb-6 px-6 md:px-16 mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {footerLinks.map(({ section, links }, i) => (
            <div key={i}>
              <h4 className="text-white font-semibold mb-4">{section}</h4>
              <ul className="space-y-2 text-sm">
                {links.map((text, j) => (
                  <li key={j}>
                    <Link
                      to={`/${text.toLowerCase().replace(/ /g, "-")}`}
                      className="hover:text-indigo-400 transition duration-300"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-6">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} TaskBot. All rights reserved.
          </p>
          <motion.img
            src="/assets/logo-glow.png"
            alt="TaskBot Logo"
            className="w-28 opacity-80 hover:opacity-100 hover:scale-110 transition duration-300"
            whileHover={{ scale: 1.1 }}
          />
        </div>
      </footer>
    </div>
  );
};

export default Home;
