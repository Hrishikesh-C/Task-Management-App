import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, type: "spring" },
  }),
};

const FeatureCard = ({ icon, title, description, index }) => (
  <motion.div
    className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-indigo-500/20 p-6 rounded-2xl shadow-lg hover:shadow-indigo-400/50 transition-transform hover:scale-105 hover:ring-2 hover:ring-indigo-400"
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    custom={index}
    viewport={{ once: true }}
  >
    <div className="flex items-center gap-4 mb-4 text-indigo-300 text-3xl">
      {icon}
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <p className="text-gray-400 text-sm">{description}</p>
  </motion.div>
);

export default FeatureCard;
