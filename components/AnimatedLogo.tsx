'use client';

import { motion } from 'framer-motion';

export const AnimatedLogo = () => {
  const letters = ['A', 'n', 'o', 'n', 'y', 'm', 'o', 'u', 's'];

  const letterVariants = {
    initial: {
      color: '#ffffff',
      textShadow: '0 0 0px rgba(124, 58, 237, 0)',
    },
    hover: {
      color: '#7c3aed',
      textShadow: '0 0 20px rgba(124, 58, 237, 0.8)',
      scale: 1.1,
      y: -2,
    },
  };

  return (
    <div className="flex items-center space-x-1">
      <motion.span
        className="text-xl font-bold text-muted-foreground"
        whileHover={{ color: '#7c3aed' }}
      >
        {'<'}
      </motion.span>
      <div className="flex">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="text-xl font-bold cursor-pointer"
            variants={letterVariants}
            initial="initial"
            whileHover="hover"
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <motion.span
        className="text-xl font-bold text-muted-foreground ml-1"
        whileHover={{ color: '#7c3aed' }}
      >
        {'/>'}
      </motion.span>
    </div>
  );
};
