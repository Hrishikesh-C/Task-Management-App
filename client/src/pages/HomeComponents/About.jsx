import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white px-6 md:px-16 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          About <span className="text-purple-400">TaskMe</span>
        </h1>
        <p className="text-lg text-gray-300 mb-12">
          TaskMe is a real-time, AI-powered task management platform designed to help individuals and teams work smarter, not harder.
          Our mission is to empower users to stay organized, collaborate seamlessly, and maximize productivity with minimal effort.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 mt-10"
      >
        <div className="bg-[#1c1f2a] p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">Our Story</h2>
          <p className="text-gray-400 leading-relaxed">
            TaskMe was born out of the frustration of juggling scattered to-dos across sticky notes, chats, and inboxes.
            We imagined a unified space where everything is organized, real-time, and smart. That idea became our product.
          </p>
        </div>
        <div className="bg-[#1c1f2a] p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">Our Values</h2>
          <ul className="text-gray-400 space-y-3 list-disc pl-5">
            <li>✨ Simplicity over complexity</li>
            <li>🔒 Security and user privacy first</li>
            <li>🚀 Constant innovation</li>
            <li>💬 Transparency and open communication</li>
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-20 text-center"
      >
         <div className="text-center mt-16">
                <Link
                  to="/"
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-lg font-semibold transition"
                >
                  Back to Home
                </Link>
              </div>
      </motion.div>
    </div>
  );
};

export default About;
