import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';  // Import EmailJS

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);  // Set sending to true to show loading
    setStatusMessage('Sending message...');

    // Use EmailJS to send email
    emailjs
      .sendForm('service_pv7t4hl','template_ku8qf1o', e.target, 'Kf3mIFngfElXmacBq')
      .then(
        (result) => {
          setIsSending(false);
          setStatusMessage('Message sent successfully! We will get back to you shortly.');
          setFormData({ name: '', email: '', message: '' });  // Clear form fields after successful submission
        },
        (error) => {
          setIsSending(false);
          setStatusMessage('Error sending message. Please try again later.');
        }
      );
  };

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
          <Link to="/" className="hover:text-purple-400 transition duration-300">
            Home
          </Link>
          <Link to="/log-in" className="hover:text-purple-400 transition duration-300">
            Login
          </Link>
          <Link to="/register" className="hover:text-purple-400 transition duration-300">
            Register
          </Link>
        </div>
      </motion.nav>

      {/* Contact Form */}
      <motion.section
        id="contact"
        className="flex-grow py-20 px-6 md:px-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-purple-300 mb-4">Contact Us</h2>
          <p className="text-gray-300 mb-10">
            Have any questions or feedback? We'd love to hear from you.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <motion.input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="p-4 rounded-xl bg-[#1f2333] text-white placeholder-gray-400 border border-[#333] focus:outline-none focus:ring-2 focus:ring-purple-500"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <motion.input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="p-4 rounded-xl bg-[#1f2333] text-white placeholder-gray-400 border border-[#333] focus:outline-none focus:ring-2 focus:ring-purple-500"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <motion.textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="p-4 rounded-xl bg-[#1f2333] text-white placeholder-gray-400 border border-[#333] focus:outline-none focus:ring-2 focus:ring-purple-500"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
            <motion.button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold text-white shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              disabled={isSending}
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </motion.button>
          </form>

          {statusMessage && (
            <div className="mt-6 text-gray-300">
              <p>{statusMessage}</p>
            </div>
          )}
        </div>
        <div className="text-center mt-16">
        <Link
          to="/"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow-lg font-semibold transition"
        >
          Back to Home
        </Link>
      </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-[#151720] text-gray-400 py-6 px-6 md:px-16 mt-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} TaskManagerX. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-purple-400 transition">Home</Link>
            <Link to="/contact" className="hover:text-purple-400 transition">Contact</Link>
            <a href="/#features" className="hover:text-purple-400 transition">Features</a>
          </div>
        </div>
      </footer>
    </div>
    
  );
};

export default Contact;
