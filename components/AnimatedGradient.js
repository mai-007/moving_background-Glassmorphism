import React from 'react';
import { motion } from 'framer-motion';

const AnimatedGradientBackground = () => {
  return (
    <motion.div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        backgroundSize: '400% 400%',
        filter: 'blur(200px)',
        animation: 'gradientAnimation 15s ease infinite',
      }}
    />
  );
};

export default AnimatedGradientBackground;