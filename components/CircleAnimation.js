// CircleAnimation.js
import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const CircleAnimation = () => {
  const [hovered, setHovered] = useState(false);
  const controls = useAnimation();

  const circleVariants = {
    normal: {
      scale: 1,
      borderColor: '#000000',
      transition: { duration: 1, ease: 'easeInOut' },
    },
    hovered: {
      scale: 1.2,
      borderColor: '#ff0000',
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  };

  const containerVariants = {
    normal: {},
    hovered: {},
  };

  const handleHover = () => {
    setHovered(true);
    controls.start('hovered');
  };

  const handleUnhover = () => {
    setHovered(false);
    controls.start('normal');
  };

  const handleMouseMove = (e) => {
    if (hovered) {
      const { clientX, clientY } = e;
      controls.start({
        x: clientX,
        y: clientY,
      });
    }
  };

  return (
    <motion.div
      style={{ position: 'relative', width: '100vw', height: '100vh' }}
      variants={containerVariants}
      initial="normal"
      animate={controls}
    >
      <motion.svg
        width="300"
        height="300"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={handleHover}
        onMouseLeave={handleUnhover}
        onMouseMove={handleMouseMove}
      >
        <motion.circle
          cx="150"
          cy="150"
          r="50"
          fill="none"
          strokeWidth="2"
          stroke="black"
          variants={circleVariants}
          initial="normal"
        />
        <motion.circle
          cx="150"
          cy="150"
          r="50"
          fill="none"
          strokeWidth="2"
          stroke="black"
          variants={circleVariants}
          initial="normal"
        />
        <motion.circle
          cx="150"
          cy="150"
          r="50"
          fill="none"
          strokeWidth="2"
          stroke="black"
          variants={circleVariants}
          initial="normal"
        />
      </motion.svg>
    </motion.div>
  );
};

export default CircleAnimation;
