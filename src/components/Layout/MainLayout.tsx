
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import StarsBackground from '../Background/StarsBackground';
import LoadingSpinner from '../ui/LoadingSpinner';
import { motion } from 'framer-motion';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const logoAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <StarsBackground />
      
      {isLoading ? (
        <LoadingSpinner fullScreen />
      ) : (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex flex-col min-h-screen"
        >
          <Navbar />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
};

export default MainLayout;
