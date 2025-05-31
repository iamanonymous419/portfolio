'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { TerminalAbout } from '@/components/Terminal';
import { SkillsSection } from '@/components/Skills';
import { LearningJourneySlider } from '@/components/LlearningJourneySlider';
import { AnimatedLogo } from '@/components/AnimatedLogo';
import { AnimatedQuote } from '@/components/AnimatedQuote';
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  Typewriter,
  PulseAnimation,
} from '@/components/Animations';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Contact from '@/components/sections/Contact';
import Project from '@/components/sections/Project';

const Home: React.FunctionComponent = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 50);

      // Get all sections
      const sections: string[] = [
        'hero',
        'about',
        'projects',
        'skills',
        'journey',
        'contact',
      ];
      const scrollPosition: number = window.scrollY + 200; // Increased offset for better detection
      const windowHeight: number = window.innerHeight;
      const documentHeight: number = document.documentElement.scrollHeight;

      // Check if we're near the bottom of the page (for contact section)
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        setActiveSection('contact');
        return;
      }

      /**
       * if it work then leave it as it is,
       * this loop iterates through sections in reverse order
       * to find the first section that is currently in view.
       * It checks if the scroll position is greater than or equal to the section's offsetTop minus a threshold (100px).
       * If it is, it sets that section as the active section and breaks the loop.
       * This ensures that the active section is always the one closest to the top of the viewport.
       * This approach allows for smooth scrolling and accurate section detection
       * while scrolling through the page.
       */
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop - 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const getNavItemClass = (section: string): string => {
    const isActive = activeSection === section;
    return cn(
      'relative transition-all duration-500',
      isActive ? 'text-primary' : 'text-foreground hover:text-primary',
      'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-500',
      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
    );
  };

  const getMobileNavItemClass = (section: string): string => {
    const isActive = activeSection === section;
    return cn(
      'py-2 px-4 rounded-md transition-all duration-500 text-left',
      isActive
        ? 'bg-primary/20 text-primary'
        : 'hover:bg-primary/10 text-foreground'
    );
  };

  /**
   * This is the main Home component that renders the entire page.
   * It includes a header with navigation, a hero section, and various content sections.
   * The header is sticky and changes style based on scroll position.
   * The component uses hooks to manage scroll state, mobile menu state, and active section state.
   * It also includes smooth scrolling functionality for navigation links.
   * The page is styled using Tailwind CSS and includes various animations for a modern look.
   * The main content includes sections for the hero, about, projects, skills, learning journey, and contact.
   * The footer includes a quote and links to the GitHub profile.
   */
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      {/* Header */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500',
          scrolled
            ? 'backdrop-blur-xl bg-background/70 border-b border-border/40 shadow-lg shadow-background/20'
            : 'backdrop-blur-sm bg-background/30 border-b border-transparent'
        )}
      >
        <div className="container flex h-14 sm:h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center space-x-2 group"
            >
              <AnimatedLogo />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium">
            <button
              onClick={() => scrollToSection('about')}
              className={getNavItemClass('about')}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className={getNavItemClass('projects')}
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className={getNavItemClass('skills')}
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('journey')}
              className={getNavItemClass('journey')}
            >
              Journey
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={getNavItemClass('contact')}
            >
              Contact
            </button>
            <Button asChild variant="default" size="sm" className="group ml-4">
              <Link
                href="https://github.com/iamanonymous419"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                GitHub
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="flex md:hidden items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 text-primary transition-colors duration-300 hover:bg-primary/20"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className={cn(
              'md:hidden transition-all duration-300',
              scrolled
                ? 'bg-background/90 backdrop-blur-xl border-b border-border/40'
                : 'bg-background/70 backdrop-blur-lg border-b border-border/20'
            )}
          >
            <nav className="container flex flex-col py-4 space-y-2 text-sm font-medium px-4">
              <button
                onClick={() => scrollToSection('about')}
                className={getMobileNavItemClass('about')}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className={getMobileNavItemClass('projects')}
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection('skills')}
                className={getMobileNavItemClass('skills')}
              >
                Skills
              </button>
              <button
                onClick={() => scrollToSection('journey')}
                className={getMobileNavItemClass('journey')}
              >
                Journey
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={getMobileNavItemClass('contact')}
              >
                Contact
              </button>
              <div className="pt-2">
                <Button asChild variant="default" size="sm" className="w-full">
                  <Link
                    href="https://github.com/iamanonymous419"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="overflow-x-hidden pt-14 sm:pt-16">
        {/* Hero Section */}
        <section
          id="hero"
          className="relative py-16 sm:py-20 md:py-32 overflow-hidden box-cross-pattern"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background"></div>
          <div className="container relative z-10 mx-auto flex flex-col items-center gap-4 sm:gap-6 text-center px-4">
            <FadeIn>
              <div className="inline-block mb-2 sm:mb-4">
                <Badge
                  variant="outline"
                  className="px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium border-primary/30 bg-primary/5"
                >
                  Web Developer & DevOps Expert
                </Badge>
              </div>
            </FadeIn>
            <FadeIn>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight gradient-text glow-text px-4 leading-tight sm:leading-tight md:leading-tight lg:leading-tight overflow-visible">
                <span className="block pb-4">Hi👋🏻, I&apos;m Anonymous</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2} className="max-w-3xl px-4">
              <Typewriter
                text="Web Dev | DevOps | Full Stack Web Developer"
                className="text-lg sm:text-xl md:text-2xl text-muted-foreground flex flex-wrap justify-center"
                delay={0.5}
              />
            </FadeIn>
            <StaggerContainer
              className="flex flex-wrap justify-center gap-2 sm:gap-3 py-4 sm:py-6 px-4"
              delay={0.8}
            >
              {[
                'Web Development',
                'Full Stack',
                'DevOps',
                'Infrastructure as Code',
                'CI/CD Automation',
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <Badge className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium bg-primary/10 hover:bg-primary/20 text-primary-foreground border-none transition-colors duration-300">
                    {item}
                  </Badge>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <FadeIn delay={1.2} direction="up">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 sm:mt-4 px-4">
                <Button
                  onClick={() => scrollToSection('projects')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-medium px-6 sm:px-8 transition-transform hover:scale-105 shadow-lg hover:shadow-primary/20"
                >
                  View Projects
                </Button>
                <Button
                  onClick={() => scrollToSection('contact')}
                  variant="outline"
                  size="lg"
                  className="border-primary/20 bg-primary/5 hover:bg-primary/10 text-foreground font-medium px-6 sm:px-8 transition-transform hover:scale-105"
                >
                  Contact Me
                </Button>
              </div>
            </FadeIn>
            <FadeIn delay={1.6} className="mt-8 sm:mt-12">
              <PulseAnimation>
                <button
                  onClick={() => scrollToSection('about')}
                  className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="text-xs sm:text-sm mb-2">Scroll Down</span>
                  <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 animate-bounce" />
                </button>
              </PulseAnimation>
            </FadeIn>
          </div>
        </section>

        {/* About Me */}
        <section
          id="about"
          className="py-16 sm:py-20 scroll-mt-20 box-cross-pattern relative"
        >
          <div className="absolute inset-0 bg-background/90"></div>
          <div className="container relative z-10 px-4">
            <FadeIn>
              <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold gradient-text">
                  🧰 About Me And Tech Stack
                </h2>
                <p className="max-w-[700px] text-sm sm:text-base md:text-xl text-muted-foreground px-4">
                  A passionate developer with expertise in web technologies and
                  DevOps
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <TerminalAbout />
            </FadeIn>
          </div>
        </section>

        {/* Featured Projects */}
        <section
          id="projects"
          className="py-16 sm:py-20 scroll-mt-20 box-cross-pattern relative"
        >
          <Project />
        </section>

        {/* Skills */}
        <section
          id="skills"
          className="py-16 sm:py-20 scroll-mt-20 dot-pattern relative"
        >
          <div className="absolute inset-0 bg-background/20 backdrop-blur-sm"></div>
          <div className="container relative z-10 px-4">
            <FadeIn>
              <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold gradient-text">
                  🛠️ Tech Stack
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <SkillsSection />
            </FadeIn>
          </div>
        </section>

        {/* Learning Journey */}
        <section
          id="journey"
          className="py-16 sm:py-20 scroll-mt-20 dot-pattern relative"
        >
          <div className="absolute inset-0 bg-background/20 backdrop-blur-sm"></div>
          <div className="container relative z-10 px-4">
            <FadeIn delay={0.3}>
              <LearningJourneySlider />
            </FadeIn>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="py-16 sm:py-20 scroll-mt-20 bg-background"
        >
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-6 sm:py-8 bg-background">
        <div className="container px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center space-x-2 group"
            >
              <div className="relative flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-primary/10 overflow-hidden">
                <span className="text-sm sm:text-lg">👨‍💻</span>
              </div>
              <span className="font-bold text-base sm:text-lg">Anonymous</span>
            </button>
            <p className="text-center md:text-left text-xs sm:text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Anonymous. All rights reserved.
            </p>
          </div>
          <div className="flex items-center">
            <AnimatedQuote />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
