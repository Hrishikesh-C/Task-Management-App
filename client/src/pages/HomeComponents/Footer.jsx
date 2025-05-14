import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const footerLinks = [
  { section: "About", links: ["Our Story", "Team", "Contact Us"] },
  { section: "Support", links: ["Help Center", "User Guides"] },
  { section: "Features", links: ["Task Boards", "Get Started", "Login"] },
  { section: "Legal", links: ["Privacy Policy", "Terms of Service"] },
];

const Footer = () => (
  <footer className="bg-[#0F172A] text-gray-400 pt-12 pb-6 px-6 md:px-16 mt-10 relative z-10">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
      {footerLinks.map(({ section, links }, i) => (
        <div key={i}>
          <h4 className="text-white font-semibold mb-4">{section}</h4>
          <ul className="space-y-2 text-sm">
            {links.map((text, j) => (
              <li key={j}>
                <Link
                  to={`/${text.toLowerCase().replace(/ /g, "-")}`}
                  className="hover:text-indigo-400 transition"
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
      <p className="text-sm">&copy; {new Date().getFullYear()} TaskBot. All rights reserved.</p>
      <motion.img
        src="/assets/logo-glow.png"
        alt="TaskBot Logo"
        className="w-28 opacity-80 hover:opacity-100 transition-transform hover:scale-110"
        whileHover={{ scale: 1.1 }}
      />
    </div>
  </footer>
);

export default Footer;
