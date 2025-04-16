import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const guides = [
  {
    step: "1. Getting Started",
    description:
      "Create an account, set up your workspace, and invite your team members to collaborate in real-time.",
  },
  {
    step: "2. Creating Tasks",
    description:
      "Easily add new tasks, assign priority, set deadlines, and categorize them with tags.",
  },
  {
    step: "3. Managing Your Workflow",
    description:
      "Use status boards like To-do, In-Progress, and Completed to manage and track all tasks effortlessly.",
  },
  {
    step: "4. Notifications & Updates",
    description:
      "Stay in the loop with smart alerts and live activity feeds from your team or system.",
  },
  {
    step: "5. Customization",
    description:
      "Switch between light/dark themes, configure Slack/GitHub integrations, and fine-tune notification settings.",
  },
];

const UserGuide = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white px-6 md:px-16 py-20">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-purple-300">
          TaskMe User Guide
        </h1>
        <p className="text-gray-300 text-lg mb-12">
          Learn how to use our platform to boost productivity and streamline your team's workflow.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {guides.map((guide, index) => (
          <motion.div
            key={index}
            className="bg-[#2a2d3e] p-6 rounded-xl shadow-lg border-l-4 border-purple-500"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-purple-300 mb-2">{guide.step}</h3>
            <p className="text-gray-400">{guide.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-16">
        <Link
          to="/"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-lg font-semibold transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default UserGuide;
