'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface JourneyItem {
  date: string;
  skill: string;
  icon: string;
}

export const LearningJourneySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const journeyItems: JourneyItem[] = [
    { date: 'August 2023', skill: 'HTML', icon: '🌐' },
    { date: 'November 2023', skill: 'CSS', icon: '🎨' },
    { date: 'December 2023', skill: 'JavaScript', icon: '💻' },
    { date: 'January 2024', skill: 'Git & GitHub', icon: '🗃️' },
    { date: 'March 2024', skill: 'React + Tailwind CSS', icon: '⚛️ 💨' },
    { date: 'April 2024', skill: 'SCSS', icon: '💅' },
    { date: 'June 2024', skill: 'Node.js & Express.js', icon: '🟩 🚂' },
    { date: 'June 2024', skill: 'MongoDB & NestJS', icon: '🍃 🧱' },
    { date: 'July 2024', skill: 'MySQL & PostgreSQL', icon: '🐬 🐘' },
    { date: 'August 2024', skill: 'Prisma ORM', icon: '🧩' },
    { date: 'September 2024', skill: 'Next.js', icon: '🔥' },
    { date: 'October 2024', skill: 'Docker', icon: '🐳' },
    { date: 'December 2024', skill: 'Kubernetes', icon: '☸️' },
    { date: 'January 2025', skill: 'Bash Scripting & Linux', icon: '🐚 🐧' },
    { date: 'February 2025', skill: 'Terraform & Ansible', icon: '📦 🧰' },
    {
      date: 'March 2025',
      skill:
        'AWS, EKS, Trivy, Jenkins, Grafana, Prometheus, ArgoCD, Drizzle ORM',
      icon: '☁️',
    },
    { date: 'April 2025', skill: 'AWS & its Services Deep Dive', icon: '🧠' },
    { date: 'May 2025', skill: 'Present Day', icon: '📍' },
  ];

  // Responsive items per page
  const getItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1; // Mobile
      return 2; // Desktop
    }
    return 2;
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const totalPages = Math.ceil(journeyItems.length / itemsPerPage);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % totalPages);
      setIsTransitioning(false);
    }, 150);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(prev => (prev - 1 + totalPages) % totalPages);
      setIsTransitioning(false);
    }, 150);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 150);
  };

  const getCurrentItems = () => {
    const start = currentIndex * itemsPerPage;
    return journeyItems.slice(start, start + itemsPerPage);
  };

  return (
    <div className="relative w-full">
      <div className="text-center mb-6 sm:mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text mb-2 sm:mb-4"
        >
          📈 My Learning Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-muted-foreground px-4"
        >
          Consistently improving my skills and knowledge
        </motion.p>
      </div>

      <Card className="border-primary/20 min-h-[250px] sm:min-h-[300px] bg-transparent backdrop-blur-xl border border-white/10 overflow-hidden">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <div className="relative overflow-hidden">
            {isTransitioning ? (
              <div className="flex justify-center items-center h-32 sm:h-48">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: 'linear',
                  }}
                  className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-primary border-t-transparent rounded-full"
                />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2"
                >
                  {getCurrentItems().map((item, index) => (
                    <motion.div
                      key={`${currentIndex}-${index}`}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="text-center space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300"
                      whileHover={{ scale: 1.01, y: -2 }}
                    >
                      <motion.div
                        className="text-primary font-semibold text-sm sm:text-base lg:text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        {item.date}
                      </motion.div>
                      <motion.div
                        className="text-3xl sm:text-4xl lg:text-6xl mb-2 sm:mb-4"
                        whileHover={{ scale: 1.05, rotate: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.icon}
                      </motion.div>
                      <motion.div
                        className="text-sm sm:text-base lg:text-xl font-bold text-foreground px-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      >
                        {item.skill}
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          <div className="flex justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={isTransitioning}
              className="rounded-full border-primary/30 hover:bg-primary hover:text-primary-foreground bg-white/5 backdrop-blur-md border-white/10 h-8 w-8 sm:h-10 sm:w-10"
            >
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>

            <div className="flex gap-1 sm:gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary shadow-lg'
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={isTransitioning}
              className="rounded-full border-primary/30 hover:bg-primary hover:text-primary-foreground bg-white/5 backdrop-blur-md border-white/10 h-8 w-8 sm:h-10 sm:w-10"
            >
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
