import React from "react";
import FeatureCard from "./FeatureCard";
import { FaRocket, FaUserFriends, FaTasks, FaBell, FaCogs } from "react-icons/fa";

const features = [
  {
    icon: <FaTasks />,
    title: "Task Dashboard",
    description: "Organize to-dos visually with intuitive boards and smart priorities that adapt to your workflow.",
  },
  {
    icon: <FaUserFriends />,
    title: "Team Collaboration",
    description: "Assign tasks, tag teammates, and track updates in real-time—built for remote and hybrid teams.",
  },
  {
    icon: <FaBell />,
    title: "Smart Notifications",
    description: "Receive context-aware alerts so you stay focused on what matters most.",
  },
  {
    icon: <FaRocket />,
    title: "Productivity Boosters",
    description: "Use Pomodoro timers, AI insights, and custom goals to maximize efficiency.",
  },
  {
    icon: <FaCogs />,
    title: "Advanced Settings",
    description: "Personalize your environment, toggle dark mode, and fine-tune integrations.",
  },
];

const FeaturesSection = () => (
  <section id="features" className="px-6 md:px-16 py-20 bg-black/70 backdrop-blur-md relative z-10">
    <h2 className="text-4xl font-semibold mb-14 text-center text-indigo-300">Core Features</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {features.map((feature, i) => (
        <FeatureCard key={i} {...feature} index={i} />
      ))}
    </div>
  </section>
);

export default FeaturesSection;
