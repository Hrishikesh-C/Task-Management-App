import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => (
  <motion.nav
    className="flex justify-between items-center px-8 py-5 sticky top-0 z-10 backdrop-blur-md bg-white/10 shadow"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <div className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
      TaskBot
    </div>
    <div className="flex gap-6 text-sm font-medium text-white">
      <Link to="/contact" className="hover:text-indigo-300 transition">Contact</Link>
      <Link to="/log-in" className="hover:text-indigo-300 transition">Login</Link>
      <Link to="/register" className="hover:text-indigo-300 transition">Register</Link>
    </div>
  </motion.nav>
);

export default Navbar;
