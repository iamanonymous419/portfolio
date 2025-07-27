'use client';

import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Interface representing a skill with its name, proficiency level, and icon.
 * The `name` is a string representing the skill name.
 * The `level` is a number representing the proficiency level (0-100).
 * The `icon` is a string representing the skill icon, which can be an emoji or an image URL.
 * The `SkillsData` interface is a mapping of skill categories to arrays of skills.
 * The keys are category names (e.g., 'Frontend', 'Backend', etc.),
 * and the values are arrays of `Skill` objects.
 * This structure allows for easy categorization and retrieval of skills based on their type.
 */
interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillsData {
  [key: string]: Skill[];
}

export const SkillsSection: React.FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<string>('Frontend');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Skills data structured by categories
   * Skills data categorized into Frontend, Backend, DevOps, and Others.
   * Each skill has a name, proficiency level (0-100), and an icon.
   * Icons are represented as emojis for simplicity.
   * This data can be easily extended or modified to include more skills or categories.
   */
  const skillsData: SkillsData = {
    Frontend: [
      { name: 'React', level: 90, icon: '⚛️' },
      { name: 'TypeScript', level: 85, icon: '🔷' },
      { name: 'ShadCN', level: 85, icon: '🎨' },
      { name: 'DaisyUI', level: 40, icon: '🌼' },
      { name: 'Redux', level: 75, icon: '🔄' },
      { name: 'TanStack Query', level: 75, icon: '📊' },
      { name: 'JavaScript', level: 95, icon: '🟨' },
      { name: 'Tailwind CSS', level: 90, icon: '💨' },
      { name: 'React Hook Form', level: 80, icon: '📝' },
      { name: 'RTK Query', level: 70, icon: '🔍' },
      { name: 'React Router', level: 95, icon: '🛣️' },
    ],
    Backend: [
      { name: 'Node.js', level: 85, icon: '🟢' },
      { name: 'Python', level: 75, icon: '🐍' },
      { name: 'Express.js', level: 80, icon: '🚂' },
      { name: 'NestJS', level: 75, icon: '🏗️' },
      { name: 'Drizzle ORM', level: 65, icon: '💧' },
      { name: 'MongoDB', level: 80, icon: '🍃' },
      { name: 'Prisma', level: 70, icon: '🔺' },
      { name: 'JWT', level: 85, icon: '🔐' },
      { name: 'PostgreSQL', level: 75, icon: '🐘' },
      { name: 'MySQL', level: 70, icon: '🐬' },
    ],
    DevOps: [
      { name: 'Docker', level: 85, icon: '🐳' },
      { name: 'Terraform', level: 75, icon: '🏗️' },
      { name: 'Jenkins', level: 75, icon: '🔧' },
      { name: 'AWS', level: 80, icon: '☁️' },
      { name: 'Grafana', level: 65, icon: '📊' },
      { name: 'Kubernetes', level: 80, icon: '☸️' },
      { name: 'Ansible', level: 70, icon: '🔴' },
      { name: 'ArgoCD', level: 70, icon: '🚀' },
      { name: 'Prometheus', level: 70, icon: '📈' },
      { name: 'Alertmanager', level: 65, icon: '🚨' },
      { name: 'Linux', level: 85, icon: '🐧' },
      { name: 'Bash', level: 75, icon: '💻' },
      { name: 'SonarQube', level: 75, icon: '🔍' },
      { name: 'OWASP ZAP', level: 70, icon: '🛡️' },
      { name: 'GitHub Action', level: 55, icon: '⚙️' },
      { name: 'CircleCI', level: 65, icon: '🔄' },
      { name: 'Elasticsearch', level: 65, icon: '🔍' },
      { name: 'Filebeat', level: 60, icon: '📝' },
      { name: 'Kibana', level: 65, icon: '📊' },
    ],
    Others: [
      { name: 'Next.js', level: 85, icon: '⚡' },
      { name: 'GitHub', level: 90, icon: '🐙' },
      { name: 'CSS3', level: 85, icon: '🎨' },
      { name: 'Cloudinary', level: 70, icon: '☁️' },
      { name: 'Yarn', level: 80, icon: '🧶' },
      { name: 'Git', level: 90, icon: '📝' },
      { name: 'SCSS', level: 75, icon: '💅' },
      { name: 'GraphQL', level: 70, icon: '🔗' },
      { name: 'NPM', level: 85, icon: '📦' },
      { name: 'pnpm', level: 75, icon: '⚡' },
      { name: 'Bun', level: 70, icon: '🥖' },
      { name: 'HashiCorp Vault', level: 20, icon: '🔐' },
      { name: 'Nginx', level: 70, icon: '🌐' },
      { name: 'Jest', level: 30, icon: '🧪' },
      { name: 'Slack', level: 70, icon: '💬' },
    ],
  };

  const tabs: string[] = ['Frontend', 'Backend', 'DevOps', 'Others'];

  const handleTabChange = (tab: string): void => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setIsLoading(false);
    }, 200);
  };

  return (
    /**
     * SkillsSection component styled with Tailwind CSS and Framer Motion for animations.
     */
    <Card className="border-primary/20 bg-transparent backdrop-blur-xl border border-white/10 overflow-hidden">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg text-muted-foreground px-2">
            Technologies and tools I work with
          </h3>
        </div>

        {/* Mobile-first responsive tabs */}
        <div className="flex justify-center mb-6 sm:mb-8 overflow-x-auto">
          <div className="flex bg-white/5 backdrop-blur-md rounded-lg p-1 sm:p-2 border border-white/10 gap-1 sm:gap-2 lg:gap-4 min-w-max">
            {tabs.map(tab => (
              <motion.button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-3 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-md text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tab}
              </motion.button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-48 sm:h-64">
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
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-2"
          >
            {skillsData[activeTab].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 hover:border-primary/30 transition-all duration-300"
                whileHover={{ scale: 1.01, y: -1 }}
              >
                <motion.span
                  className="text-base sm:text-lg flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {skill.icon}
                </motion.span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1 sm:mb-2">
                    <span className="text-xs sm:text-sm font-medium truncate pr-2">
                      {skill.name}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5 sm:h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{
                        duration: 1,
                        delay: index * 0.05,
                        ease: 'easeOut',
                      }}
                      className="bg-gradient-to-r from-primary to-primary/70 h-1.5 sm:h-2 rounded-full shadow-sm"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
