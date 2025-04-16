import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "What is TaskMe?",
    answer:
      "TaskMe is a powerful task management tool designed to help individuals and teams collaborate seamlessly. With features like real-time updates, task assignments, and workflow management, TaskMe helps you stay organized and productive.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Creating an account is easy! Just click on the 'register' button on the homepage, enter your details, and you’ll be ready to start using TaskMe. After register you can login using your required credentials",
  },
  {
    question: "Can I use TaskMe for personal tasks?",
    answer:
      "Yes, TaskMe can be used for personal tasks as well. You can create a personal workspace, set up reminders, and track progress on your own goals and tasks.",
  },
  {
    question: "How do I collaborate with my team?",
    answer:
      "You can invite team members to your workspace only through admin. Once they join, you can assign tasks, set deadlines, and track progress in real-time. TaskMe ensures that all team members are on the same page with automatic notifications and updates.",
  },
  {
    question: "How do I organize my tasks?",
    answer:
      "Tasks in TaskMe are organized using status boards like 'To-do,' 'In-Progress,' and 'Completed.' You can assign priority levels, add tags, and set due dates to further organize your tasks and projects.",
  },
  {
    question: "Can I change the theme of TaskMe?",
    answer:
      "Yes, TaskMe offers both light and dark themes. You can switch between them in the settings section to choose the one that best suits your preferences.",
  },
  {
    question: "How do I manage notifications?",
    answer:
      "You can customize your notification settings to receive alerts based on specific activities, such as task updates, mentions, and comments. Additionally, you can set quiet hours for when you don’t want to be disturbed.",
  },
  {
    question: "What should I do if I encounter a bug?",
    answer:
      "If you encounter a bug, please report it via the 'contact' section in the app. Our support team will get back to you as soon as possible to resolve the issue.",
  },
  {
    question: "Is TaskMe free to use?",
    answer:
      "TaskMe offers both free and premium plans. The free plan includes core features like task management, collaboration tools, and basic integrations. Premium plans unlock advanced features such as unlimited integrations, advanced reporting, and custom branding.",
  },
];

const Faq = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white px-6 md:px-16 py-20">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-purple-300">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-300 text-lg mb-12">
          Find answers to the most common questions about TaskMe. If you need further assistance, feel free to reach out to our support team.
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto space-y-8">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="bg-[#2a2d3e] p-6 rounded-xl shadow-lg border-l-4 border-purple-500"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold text-purple-300 mb-4">{faq.question}</h3>
            <p className="text-gray-400">{faq.answer}</p>
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

export default Faq;
