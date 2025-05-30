'use client';

import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface TechStackProps {
  category: 'web' | 'devops' | 'cloud' | 'database' | 'tools';
}

export const TechStack = ({ category }: TechStackProps) => {
  const technologies = {
    web: [
      {
        name: 'React',
        color: 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
      },
      {
        name: 'JavaScript',
        color: 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30',
      },
      {
        name: 'TypeScript',
        color: 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
      },
      {
        name: 'Next.js',
        color: 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30',
      },
      {
        name: 'ShadCN UI',
        color: 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30',
      },
      {
        name: 'React Hook Form',
        color: 'bg-pink-500/20 text-pink-300 hover:bg-pink-500/30',
      },
      {
        name: 'Redux',
        color: 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30',
      },
      {
        name: 'RTK Query',
        color: 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30',
      },
      {
        name: 'TanStack Query',
        color: 'bg-red-500/20 text-red-300 hover:bg-red-500/30',
      },
      {
        name: 'React Router',
        color: 'bg-red-500/20 text-red-300 hover:bg-red-500/30',
      },
      {
        name: 'CSS3',
        color: 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
      },
      {
        name: 'Tailwind CSS',
        color: 'bg-teal-500/20 text-teal-300 hover:bg-teal-500/30',
      },
      {
        name: 'SCSS',
        color: 'bg-pink-500/20 text-pink-300 hover:bg-pink-500/30',
      },
      {
        name: 'Node.js',
        color: 'bg-green-500/20 text-green-300 hover:bg-green-500/30',
      },
      {
        name: 'Express.js',
        color: 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30',
      },
      {
        name: 'NestJS',
        color: 'bg-red-500/20 text-red-300 hover:bg-red-500/30',
      },
      {
        name: 'Prisma',
        color: 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30',
      },
      {
        name: 'Drizzle ORM',
        color: 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30',
      },
      {
        name: 'JWT',
        color: 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30',
      },
      {
        name: 'GraphQL',
        color: 'bg-pink-500/20 text-pink-300 hover:bg-pink-500/30',
      },
      {
        name: 'Cloudinary',
        color: 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
      },
    ],
    devops: [
      {
        name: 'Linux',
        color: 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30',
      },
      {
        name: 'Prometheus',
        color: 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30',
      },
      {
        name: 'Grafana',
        color: 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30',
      },
      {
        name: 'Jenkins',
        color: 'bg-red-500/20 text-red-300 hover:bg-red-500/30',
      },
      {
        name: 'ArgoCD',
        color: 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30',
      },
      {
        name: 'Git',
        color: 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30',
      },
      {
        name: 'GitHub',
        color: 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30',
      },
      {
        name: 'Bash',
        color: 'bg-green-500/20 text-green-300 hover:bg-green-500/30',
      },
      {
        name: 'Kubernetes',
        color: 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
      },
      {
        name: 'minikube',
        color: 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
      },
      {
        name: 'EKS',
        color: 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30',
      },
      {
        name: 'Docker',
        color: 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
      },
      {
        name: 'Terraform',
        color: 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30',
      },
      {
        name: 'Ansible',
        color: 'bg-red-500/20 text-red-300 hover:bg-red-500/30',
      },
      {
        name: 'Trivy',
        color: 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30',
      },
    ],
    cloud: [
      {
        name: 'AWS',
        color: 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30',
      },
      {
        name: 'AWS EKS',
        color: 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30',
      },
      {
        name: 'AWS ECR',
        color: 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
      },
      {
        name: 'AWS ECS',
        color: 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
      },
      {
        name: 'AWS IAM',
        color: 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30',
      },
      {
        name: 'AWS S3',
        color: 'bg-red-500/20 text-red-300 hover:bg-red-500/30',
      },
      {
        name: 'AWS DynamoDB',
        color: 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30',
      },
      {
        name: 'AWS RDS',
        color: 'bg-green-500/20 text-green-300 hover:bg-green-500/30',
      },
      {
        name: 'AWS VPC',
        color: 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30',
      },
      {
        name: 'AWS EC2',
        color: 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30',
      },
    ],
    database: [
      {
        name: 'PostgreSQL',
        color: 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
      },
      {
        name: 'MongoDB',
        color: 'bg-green-500/20 text-green-300 hover:bg-green-500/30',
      },
      {
        name: 'MySQL',
        color: 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
      },
      {
        name: 'Prisma',
        color: 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30',
      },
      {
        name: 'Drizzle ORM',
        color: 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30',
      },
    ],
    tools: [
      { name: 'NPM', color: 'bg-red-500/20 text-red-300 hover:bg-red-500/30' },
      {
        name: 'Yarn',
        color: 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
      },
      {
        name: 'pnpm',
        color: 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30',
      },
      {
        name: 'Bun',
        color: 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30',
      },
      {
        name: 'VS Code',
        color: 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30',
      },
      {
        name: 'Postman',
        color: 'bg-orange-500/20 text-orange-300 hover:bg-orange-500/30',
      },
      {
        name: 'GitHub Actions',
        color: 'bg-gray-500/20 text-gray-300 hover:bg-gray-500/30',
      },
    ],
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="flex flex-wrap gap-3"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {technologies[category].map(tech => (
        <motion.div key={tech.name} variants={item}>
          <Badge
            className={`text-sm py-1.5 px-3 ${tech.color} transition-all duration-300 hover:scale-110 border-none`}
          >
            {tech.name}
          </Badge>
        </motion.div>
      ))}
    </motion.div>
  );
};
