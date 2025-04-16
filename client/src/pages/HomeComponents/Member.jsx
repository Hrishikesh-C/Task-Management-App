import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaPaintBrush, FaServer } from "react-icons/fa";

const teamMembers = [
  {
    name: "Hrishikesh C",
    role: "Full Stack Developer & API Integration",
    icon: <FaCode />,
    description:
      "Hrishikesh focuses on delivering seamless and interactive user interfaces with some backend integration. integrating all systems flawlessly and focusing on delivering end-to-end features.",
  },
  {
    name: "K Kumar Reddy",
    role: "Backend Developer & API Engineer",
    icon: <FaServer />,
    description:
      "Kumar handles all things backend—from designing secure APIs to maintaining robust server-side logic. His work ensures that the app runs smoothly under the hood.",
  },
  {
    name: "Yashwanth",
    role: "Frontend Developer & UI/UX Design ",
    icon: <FaPaintBrush />,
    description:
      "Yashwanth bridges the gap between front and back end,  With a keen eye for design and performance, he ensures everything looks and feels great.",
  },
];

const Members = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f2027] via-[#203a43] to-[#2c5364] text-white px-6 md:px-16 py-20">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-16 text-purple-300"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Meet the Team
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="bg-[#2a2d3e] rounded-xl p-6 shadow-lg hover:bg-purple-600 transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-3xl text-purple-300">{member.icon}</div>
              <div>
                <h2 className="text-xl font-semibold">{member.name}</h2>
                <p className="text-sm text-purple-200">{member.role}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">{member.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Optional: Add a little message at the bottom */}
      <motion.p
        className="mt-16 text-center text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        We’re a team of passionate developers working together to build better, smarter productivity tools.
      </motion.p>
    </div>
  );
};

export default Members;
