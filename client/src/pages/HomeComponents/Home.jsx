import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRocket, FaUserFriends, FaTasks, FaBell, FaCogs } from "react-icons/fa";

const Home = () => {
  const features = [
    {
      icon: <FaTasks />,
      title: "Task Dashboard",
      description:
        "Organize your to-dos in one sleek interface. Visual boards, status columns, and priority labels help you stay focused and on track throughout your day.",
    },
    {
      icon: <FaUserFriends />,
      title: "Team Collaboration",
      description:
        "Work together in real-time. Assign tasks, tag members, share comments, and track updates—all without leaving your dashboard.",
    },
    {
      icon: <FaBell />,
      title: "Smart Notifications",
      description:
        "Never miss a beat with intelligent alerts. Our system learns your habits and prioritizes what matters most to you and your team.",
    },
    {
      icon: <FaRocket />,
      title: "Productivity Boosters",
      description:
        "Enable focus mode, integrate Pomodoro timers, track goals, and receive AI-generated insights to make every minute count.",
    },
    {
      icon: <FaCogs />,
      title: "Advanced Settings",
      description:
        "Customize your entire workspace—switch between light/dark themes, configure integrations like Slack or GitHub, and set granular permissions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white flex flex-col">
      {/* Navbar */}
      <motion.nav
        className="flex justify-between items-center px-8 py-5 bg-[#1c1f2a]/80 shadow-lg backdrop-blur-md sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-2xl font-extrabold tracking-tight">
          Task<span className="text-purple-400">Me</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-semibold">
          <Link to="/contact" className="hover:text-purple-400 transition duration-300">
            Contact
          </Link>
          <Link to="/log-in" className="hover:text-purple-400 transition duration-300">
            Login
          </Link>
          <Link to="/register" className="hover:text-purple-400 transition duration-300">
            Register
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="px-6 md:px-16 py-24 flex flex-col md:flex-row justify-between items-center gap-16">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-white">
            Supercharge Your <span className="text-purple-400">Workflow</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300">
            AI-powered real-time task management built for teams and individuals. Stay synced. Stay smart.
          </p>
          <div className="mt-10 flex gap-4">
            <Link
              to="/register"
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold shadow-lg"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="border border-purple-500 px-6 py-3 rounded-xl text-purple-300 hover:bg-purple-600 hover:text-white transition"
            >
              Explore Features
            </a>
          </div>
        </motion.div>
        <motion.img
          src="https://cdn3d.iconscout.com/3d/premium/thumb/task-management-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--board-time-schedule-working-organization-organizing-project-pack-people-illustrations-3831627.png"
          alt="Task Management"
          className="w-full max-w-md drop-shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 md:px-16 py-20 bg-[#1c1f2a] flex-grow">
        <h2 className="text-4xl font-bold mb-12 text-center text-purple-300">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-[#2a2d3e] hover:bg-purple-600 transition p-6 rounded-xl shadow-md hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl text-purple-300">{feature.icon}</div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#151720] text-gray-400 pt-12 pb-6 px-6 md:px-16 mt-10">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
    <div>
      <h4 className="text-white font-semibold mb-4">About</h4>
      <ul className="space-y-2 text-sm">
        <li><Link to="/about" className="hover:text-purple-400 transition">Our Story</Link></li>
        <li><Link to="/Member" className="hover:text-purple-400 transition">Team</Link></li>
        <li><Link to="/contact" className="hover:text-purple-400 transition">Contact Us</Link></li>
      </ul>
    </div>
    <div>
      <h4 className="text-white font-semibold mb-4">Support</h4>
      <ul className="space-y-2 text-sm">
        <li><Link to="/faq" className="hover:text-purple-400 transition">Help Center</Link></li>
        <li><Link to="/guides" className="hover:text-purple-400 transition">User Guides</Link></li>      </ul>
    </div>
    <div>
      <h4 className="text-white font-semibold mb-4">Features</h4>
      <ul className="space-y-2 text-sm">
        <li><a href="#features" className="hover:text-purple-400 transition">Task Boards</a></li>
        <li><Link to="/register" className="hover:text-purple-400 transition">Get Started</Link></li>
        <li><Link to="/log-in" className="hover:text-purple-400 transition">Login</Link></li>
      </ul>
    </div>
    <div>
      <h4 className="text-white font-semibold mb-4">Legal</h4>
      <ul className="space-y-2 text-sm">
        <li><Link to="/privacy-policy" className="hover:text-purple-400 transition">Privacy Policy</Link></li>
        <li><Link to="/terms" className="hover:text-purple-400 transition">Terms of Service</Link></li>
      </ul>
    </div>
  </div>

  <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
    <p className="text-sm">&copy; {new Date().getFullYear()} TaskManagerX. All rights reserved.</p>
    <div className="mt-4 md:mt-0">
      <img
        src="/mnt/data/copyright.png"
        alt="Brand Logo"
        className="w-32 opacity-80 hover:opacity-100 transition duration-300"
      />
    </div>
  </div>
</footer>

    </div>
  );
};

export default Home;
