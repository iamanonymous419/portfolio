'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * AnimatedQuote component
 * This component displays a quote with a hover effect that animates a gradient background.
 * The quote is wrapped in a blockquote element styled with Tailwind CSS classes.
 * The animation is handled using Framer Motion for smooth transitions.
 */

export const AnimatedQuote = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <motion.blockquote
      className="italic text-sm text-muted-foreground bg-primary/5 px-4 py-2 rounded-md border border-primary/10 cursor-pointer relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '100%' : '-100%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      <span className="relative z-10">
        &quot;The more I explore, the more I realize how little I truly
        know.&quot; — Anonymous
      </span>
    </motion.blockquote>
  );
};
