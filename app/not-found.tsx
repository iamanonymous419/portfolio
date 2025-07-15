'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedLogo } from '@/components/AnimatedLogo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden flex flex-col">
      {/* Header with Logo */}
      <header className="relative z-50 w-full">
        <div className="container flex h-16 items-center px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center space-x-2 group">
              <AnimatedLogo />
            </Link>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 box-cross-pattern opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background"></div>

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* 404 Card */}
            <Card className="glass-card border-primary/20 overflow-hidden">
              <CardContent className="p-8 sm:p-12">
                {/* 404 Number */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.6,
                    type: 'spring',
                    bounce: 0.4,
                  }}
                  className="mb-6"
                >
                  <h1 className="text-8xl sm:text-9xl font-bold gradient-text glow-text">
                    404
                  </h1>
                </motion.div>

                {/* Error Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    Oops! Page Not Found
                  </h2>
                  <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto">
                    The page you&apos;re looking for doesn&apos;t exist or has
                    been moved. Let&apos;s get you back to exploring my
                    portfolio!
                  </p>
                </motion.div>

                {/* Animated Icon */}
                <motion.div
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="mb-8"
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: 'easeInOut',
                    }}
                    className="text-6xl sm:text-7xl"
                  >
                    🤖
                  </motion.div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white font-medium px-8 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary/20 group"
                  >
                    <Link href="/">
                      <Home className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                      Back to Home
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-primary/20 bg-primary/5 hover:bg-primary/10 text-foreground font-medium px-8 transition-all duration-300 hover:scale-105 group"
                    onClick={() => window.history.back()}
                  >
                    <button>
                      <ArrowLeft className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                      Go Back
                    </button>
                  </Button>
                </motion.div>

                {/* Fun Quote */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="mt-8 pt-6 border-t border-primary/20"
                >
                  <p className="text-sm text-muted-foreground italic">
                    &quot;Even the best developers encounter 404s... it&apos;s
                    all about how you handle them!&quot;
                    <span className="text-primary">— Anonymous</span>
                  </p>
                </motion.div>
              </CardContent>
            </Card>

            {/* Additional Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="mt-8 flex flex-wrap justify-center gap-4 text-sm"
            >
              <Link
                href="/#about"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline"
              >
                About Me
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                href="/#projects"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline"
              >
                Projects
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                href="/#skills"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline"
              >
                Skills
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                href="/#contact"
                className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline"
              >
                Contact
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
