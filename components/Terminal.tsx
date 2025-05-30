'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const TerminalAbout = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [typedText, setTypedText] = useState('');

  const fullText =
    'The more I explore, the more I realize how little I truly know.';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="glass-card border-primary/20 p-0 overflow-hidden bg-gradient-to-br from-background/40 via-background/20 to-background/10 backdrop-blur-xl">
          <div
            className={`${isDarkMode ? 'bg-gray-800/80' : 'bg-gray-200/80'} backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between`}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex gap-1.5 sm:gap-2">
                <motion.div
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                ></motion.div>
                <motion.div
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                ></motion.div>
                <motion.div
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                ></motion.div>
              </div>
              <span
                className={`text-xs sm:text-sm ml-2 sm:ml-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Terminal
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="h-6 w-6 sm:h-8 sm:w-8 p-0"
            >
              {isDarkMode ? (
                <Sun className="h-3 w-3 sm:h-4 sm:w-4" />
              ) : (
                <Moon className="h-3 w-3 sm:h-4 sm:w-4" />
              )}
            </Button>
          </div>

          <div
            className={`${isDarkMode ? 'bg-gray-900/80' : 'bg-gray-100/80'} backdrop-blur-sm p-4 sm:p-6 lg:p-8 font-mono text-xs sm:text-sm lg:text-base overflow-x-auto`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className={`mb-4 sm:mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-xs sm:text-sm`}
            >
              Last login: {currentTime} on console
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mb-6 sm:mb-8 break-words"
            >
              <span
                className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} text-xs sm:text-sm lg:text-base`}
              >
                anonymous@macbook:~$
              </span>
              <span
                className={`ml-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-xs sm:text-sm lg:text-base`}
              >
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className={`${isDarkMode ? 'text-green-400' : 'text-green-600'}`}
                >
                  |
                </motion.span>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className={`space-y-1 sm:space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-xs sm:text-sm lg:text-base overflow-x-auto`}
            >
              <div className="mb-2 sm:mb-3">const me = {'{'}</div>
              <div className="ml-4 sm:ml-6 mb-1 sm:mb-2 break-words">
                nickname:{' '}
                <span
                  className={`${isDarkMode ? 'text-green-300' : 'text-green-600'}`}
                >
                  &apos;Anonymous&apos;
                </span>
                ,
              </div>
              <div className="ml-4 sm:ml-6 mb-1 sm:mb-2">
                pronouns:{' '}
                <span
                  className={`${isDarkMode ? 'text-green-300' : 'text-green-600'}`}
                >
                  &apos;he/him&apos;
                </span>
                ,
              </div>
              <div className="ml-4 sm:ml-6 mb-1 sm:mb-2 break-words">
                desc:{' '}
                <span
                  className={`${isDarkMode ? 'text-green-300' : 'text-green-600'}`}
                >
                  &apos;I am a Web Developer and DevOps expert. I can build
                </span>
              </div>
              <div className="ml-8 sm:ml-12 mb-1 sm:mb-2 break-words">
                <span
                  className={`${isDarkMode ? 'text-green-300' : 'text-green-600'}`}
                >
                  full-stack projects from scratch and deploy them to
                  production.&apos;
                </span>
                ,
              </div>
              <div className="ml-4 sm:ml-6 mb-1 sm:mb-2 break-words">
                code: [
                <span
                  className={`${isDarkMode ? 'text-yellow-300' : 'text-yellow-600'}`}
                >
                  Javascript, Typescript, HTML, CSS
                </span>
                ],
              </div>
              <div className="ml-4 sm:ml-6 mb-1 sm:mb-2">focus: [</div>
              <div className="ml-8 sm:ml-12 mb-1 break-words">
                <span
                  className={`${isDarkMode ? 'text-cyan-300' : 'text-cyan-600'}`}
                >
                  &apos;Backend Development&apos;
                </span>
                ,
              </div>
              <div className="ml-8 sm:ml-12 mb-1 break-words">
                <span
                  className={`${isDarkMode ? 'text-cyan-300' : 'text-cyan-600'}`}
                >
                  &apos;Full Stack Development&apos;
                </span>
                ,
              </div>
              <div className="ml-8 sm:ml-12 mb-1 break-words">
                <span
                  className={`${isDarkMode ? 'text-cyan-300' : 'text-cyan-600'}`}
                >
                  &apos;Infrastructure as Code&apos;
                </span>
                ,
              </div>
              <div className="ml-8 sm:ml-12 mb-1 break-words">
                <span
                  className={`${isDarkMode ? 'text-cyan-300' : 'text-cyan-600'}`}
                >
                  &apos;CI/CD Automation&apos;
                </span>
                ,
              </div>
              <div className="ml-8 sm:ml-12 mb-1">
                <span
                  className={`${isDarkMode ? 'text-cyan-300' : 'text-cyan-600'}`}
                >
                  &apos;DevOps&apos;
                </span>
              </div>
              <div className="ml-4 sm:ml-6 mb-1 sm:mb-2">]</div>
              <div>{'}'}</div>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
