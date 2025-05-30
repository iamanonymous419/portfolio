'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const LearningJourney = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const journeyItems = [
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
    { date: 'May 2025', skill: 'Present Day', icon: '📍', current: true },
  ];

  return (
    <Card className="glass-card border-primary/20">
      <CardContent className="p-6">
        <div className="relative" ref={ref}>
          <motion.div
            className="absolute left-4 top-0 h-full w-0.5 bg-primary/30"
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
          <div className="space-y-8">
            {journeyItems.map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-10"
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className={`absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 ${item.current ? 'bg-primary text-primary-foreground' : 'bg-primary/10'}`}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span>{item.icon}</span>
                </motion.div>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold hover:text-primary transition-colors duration-300">
                      {item.skill}
                    </h3>
                    {item.current && (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        <Badge className="bg-primary/20 hover:bg-primary/30 text-foreground border-none">
                          Current
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
