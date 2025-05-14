import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import { motion } from "framer-motion";

const Home = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect && window.VANTA && window.THREE && vantaRef.current) {
      setVantaEffect(
        window.VANTA.NET({
          el: vantaRef.current,
          THREE: window.THREE,
          color: 0x6366f1,
          backgroundColor: 0x0f172a,
          points: 10.0,
          maxDistance: 20.0,
          spacing: 15.0,
        })
      );
    }
    return () => {
      vantaEffect?.destroy();
    };
  }, [vantaEffect]);

  return (
    <motion.div
      ref={vantaRef}
      className="min-h-screen text-white font-sans relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </motion.div>
  );
};

export default Home;
