import React from 'react';
import {
  Github,
  Mail,
  Instagram,
  Twitter,
  MessageSquare,
  Linkedin,
} from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../Animations';
import { Button } from '../ui/button';
import Link from 'next/link';

const Contact: React.FunctionComponent = () => {
  const getContactButtonColors = (platform: string): string => {
    const colors: { [key: string]: string } = {
      Email:
        'hover:bg-blue-500/20 hover:text-blue-300 hover:border-blue-500/30',
      Reddit:
        'hover:bg-orange-500/20 hover:text-orange-300 hover:border-orange-500/30',
      X: 'hover:bg-gray-800/20 hover:text-gray-300 hover:border-gray-500/30',
      Instagram:
        'hover:bg-pink-500/20 hover:text-pink-300 hover:border-pink-500/30',
      GitHub:
        'hover:bg-gray-700/20 hover:text-gray-300 hover:border-gray-500/30',
      LinkedIn:
        'hover:bg-blue-600/20 hover:text-blue-300 hover:border-blue-600/30',
    };
    return (
      colors[platform] ||
      'hover:bg-primary/20 hover:text-primary-foreground hover:border-primary/30'
    );
  };

  return (
    /**
     * Contact Section and Contact Buttons
     * This section provides a way for users to connect with the developer
     * through various platforms like Email, LinkedIn, Reddit, X, Instagram, and GitHub.
     * Each button has a unique hover effect and color scheme to enhance user interaction.
     * The buttons are wrapped in a staggered animation for a smooth entrance effect.
     * The section is responsive and adjusts to different screen sizes.
     * The FadeIn component is used to animate the entrance of the section.
     * The StaggerContainer and StaggerItem components are used to create staggered animations for the buttons.
     * The buttons are styled with Tailwind CSS classes for a modern look.
     * Icons from Lucide React are used to visually represent each platform.
     * The section is wrapped in a container for proper alignment and spacing.
     * The section is designed to be visually appealing and user-friendly,
     * encouraging users to reach out and connect with the developer.
     */

    <div className="container px-4">
      <FadeIn>
        <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold gradient-text">
            📬 Let&apos;s Connect
          </h2>
          <p className="max-w-[700px] text-sm sm:text-base md:text-xl text-muted-foreground px-4">
            Feel free to reach out to me through any of these platforms
          </p>
        </div>
      </FadeIn>
      <StaggerContainer
        className="flex flex-wrap justify-center gap-3 sm:gap-4"
        delay={0.2}
      >
        <StaggerItem>
          <Button
            asChild
            size="lg"
            className={`bg-primary/10 text-foreground border border-primary/20 font-medium px-6 sm:px-8 transition-all duration-300 hover:scale-105 group ${getContactButtonColors('Email')}`}
          >
            <Link href="mailto:anonymous292009@gmail.com">
              <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm sm:text-base">Email</span>
            </Link>
          </Button>
        </StaggerItem>
        <StaggerItem>
          <Button
            asChild
            size="lg"
            className={`bg-primary/10 text-foreground border border-primary/20 font-medium px-6 sm:px-8 transition-all duration-300 hover:scale-105 group ${getContactButtonColors('LinkedIn')}`}
          >
            <Link
              href="https://www.linkedin.com/in/debbag2009"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm sm:text-base">LinkedIn</span>
            </Link>
          </Button>
        </StaggerItem>
        <StaggerItem>
          <Button
            asChild
            size="lg"
            className={`bg-primary/10 text-foreground border border-primary/20 font-medium px-6 sm:px-8 transition-all duration-300 hover:scale-105 group ${getContactButtonColors('Reddit')}`}
          >
            <Link
              href="https://www.reddit.com/u/Anonymous292009"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageSquare className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm sm:text-base">Reddit</span>
            </Link>
          </Button>
        </StaggerItem>
        <StaggerItem>
          <Button
            asChild
            size="lg"
            className={`bg-primary/10 text-foreground border border-primary/20 font-medium px-6 sm:px-8 transition-all duration-300 hover:scale-105 group ${getContactButtonColors('X')}`}
          >
            <Link
              href="https://x.com/Anonymous292009"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm sm:text-base">X</span>
            </Link>
          </Button>
        </StaggerItem>
        <StaggerItem>
          <Button
            asChild
            size="lg"
            className={`bg-primary/10 text-foreground border border-primary/20 font-medium px-6 sm:px-8 transition-all duration-300 hover:scale-105 group ${getContactButtonColors('Instagram')}`}
          >
            <Link
              href="https://www.instagram.com/anonymous22009"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm sm:text-base">Instagram</span>
            </Link>
          </Button>
        </StaggerItem>
        <StaggerItem>
          <Button
            asChild
            size="lg"
            className={`bg-primary/10 text-foreground border border-primary/20 font-medium px-6 sm:px-8 transition-all duration-300 hover:scale-105 group ${getContactButtonColors('GitHub')}`}
          >
            <Link
              href="https://github.com/iamanonymous419"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-sm sm:text-base">GitHub</span>
            </Link>
          </Button>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
};

export default Contact;
