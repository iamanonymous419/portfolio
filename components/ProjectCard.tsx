'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  tags: string[];
  icon: ReactNode;
}

const getTagColors = (tag: string) => {
  const tagColors: { [key: string]: { bg: string; shadow: string } } = {
    // DevOps Tools
    ArgoCD: {
      bg: 'hover:bg-orange-500/20 hover:text-orange-300',
      shadow: '0 4px 12px rgba(251, 146, 60, 0.3)',
    },
    Jenkins: {
      bg: 'hover:bg-red-500/20 hover:text-red-300',
      shadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
    },
    Terraform: {
      bg: 'hover:bg-purple-500/20 hover:text-purple-300',
      shadow: '0 4px 12px rgba(168, 85, 247, 0.3)',
    },
    Ansible: {
      bg: 'hover:bg-red-600/20 hover:text-red-300',
      shadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
    },
    Trivy: {
      bg: 'hover:bg-gray-500/20 hover:text-gray-300',
      shadow: '0 4px 12px rgba(107, 114, 128, 0.3)',
    },
    Docker: {
      bg: 'hover:bg-blue-500/20 hover:text-blue-300',
      shadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    },
    Kubernetes: {
      bg: 'hover:bg-blue-600/20 hover:text-blue-300',
      shadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
    },

    // Frontend
    'Next.js': {
      bg: 'hover:bg-gray-800/20 hover:text-gray-300',
      shadow: '0 4px 12px rgba(31, 41, 55, 0.3)',
    },
    React: {
      bg: 'hover:bg-cyan-500/20 hover:text-cyan-300',
      shadow: '0 4px 12px rgba(6, 182, 212, 0.3)',
    },
    'ShadCN UI': {
      bg: 'hover:bg-slate-500/20 hover:text-slate-300',
      shadow: '0 4px 12px rgba(100, 116, 139, 0.3)',
    },
    Authentication: {
      bg: 'hover:bg-green-500/20 hover:text-green-300',
      shadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
    },
    'E-commerce': {
      bg: 'hover:bg-emerald-500/20 hover:text-emerald-300',
      shadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
    },

    // Backend
    NestJS: {
      bg: 'hover:bg-red-500/20 hover:text-red-300',
      shadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
    },
    MongoDB: {
      bg: 'hover:bg-green-600/20 hover:text-green-300',
      shadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
    },
    API: {
      bg: 'hover:bg-indigo-500/20 hover:text-indigo-300',
      shadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
    },
    Banking: {
      bg: 'hover:bg-yellow-500/20 hover:text-yellow-300',
      shadow: '0 4px 12px rgba(234, 179, 8, 0.3)',
    },

    // Cloud & Infrastructure
    AWS: {
      bg: 'hover:bg-orange-400/20 hover:text-orange-300',
      shadow: '0 4px 12px rgba(251, 146, 60, 0.3)',
    },
    EC2: {
      bg: 'hover:bg-orange-500/20 hover:text-orange-300',
      shadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
    },
    Module: {
      bg: 'hover:bg-violet-500/20 hover:text-violet-300',
      shadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
    },
    Cloud: {
      bg: 'hover:bg-sky-500/20 hover:text-sky-300',
      shadow: '0 4px 12px rgba(14, 165, 233, 0.3)',
    },

    // Package Management
    NPM: {
      bg: 'hover:bg-red-600/20 hover:text-red-300',
      shadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
    },
    Package: {
      bg: 'hover:bg-amber-500/20 hover:text-amber-300',
      shadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
    },
    JavaScript: {
      bg: 'hover:bg-yellow-400/20 hover:text-yellow-300',
      shadow: '0 4px 12px rgba(250, 204, 21, 0.3)',
    },
    Development: {
      bg: 'hover:bg-teal-500/20 hover:text-teal-300',
      shadow: '0 4px 12px rgba(20, 184, 166, 0.3)',
    },
  };

  return (
    tagColors[tag] || {
      bg: 'hover:bg-primary/20 hover:text-primary-foreground',
      shadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
    }
  );
};

export const ProjectCard = ({
  title,
  description,
  link,
  tags,
  icon,
}: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="flex flex-col h-full glass-card border-primary/20 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="text-2xl gradient-text">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow relative z-10">
          <CardDescription className="text-base text-muted-foreground mb-4">
            {description}
          </CardDescription>
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag, index) => {
              const colors = getTagColors(tag);
              return (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.1,
                    y: -2,
                    boxShadow: colors.shadow,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    className={`bg-primary/10 ${colors.bg} text-foreground border-none transition-all duration-300 cursor-pointer`}
                  >
                    {tag}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="relative z-10">
          <Button
            asChild
            className="w-full bg-primary/10 hover:bg-primary/20 text-foreground border border-primary/20 group/btn"
          >
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              View Project
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 1,
                }}
                className="text-primary"
              >
                {icon}
              </motion.div>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
