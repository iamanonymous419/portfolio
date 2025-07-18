import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Project from '@/components/sections/Project';

// Mock the animation components
jest.mock('@/components/Animations', () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="fade-in">{children}</div>
  ),
  StaggerContainer: ({
    children,
    className,
    delay,
  }: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
  }) => (
    <div
      data-testid="stagger-container"
      className={className}
      data-delay={delay}
    >
      {children}
    </div>
  ),
  StaggerItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="stagger-item">{children}</div>
  ),
}));

// Mock the ProjectCard component
jest.mock('@/components/ProjectCard', () => ({
  ProjectCard: ({
    title,
    description,
    link,
    tags,
    icon,
  }: {
    title: string;
    description: string;
    link: string;
    tags: string[];
    icon: React.ReactNode;
  }) => (
    <div data-testid="project-card" data-link={link}>
      <div data-testid="project-icon">{icon}</div>
      <h3 data-testid="project-title">{title}</h3>
      <p data-testid="project-description">{description}</p>
      <div data-testid="project-tags">
        {tags.map((tag, index) => (
          <span key={index} data-testid="project-tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  ),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Cloud: () => <div data-testid="cloud-icon">Cloud</div>,
  Database: () => <div data-testid="database-icon">Database</div>,
  ExternalLink: () => <div data-testid="external-link-icon">ExternalLink</div>,
  Github: () => <div data-testid="github-icon">Github</div>,
  LinkIcon: () => <div data-testid="link-icon">LinkIcon</div>,
  Package: () => <div data-testid="package-icon">Package</div>,
  User: () => <div data-testid="user-icon">User</div>,
}));

describe('Project Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Structure', () => {
    it('renders without crashing', () => {
      render(<Project />);
      expect(screen.getByTestId('fade-in')).toBeInTheDocument();
    });

    it('renders background overlay', () => {
      const { container } = render(<Project />);
      const overlay = container.querySelector(
        '.absolute.inset-0.bg-background\\/95'
      );
      expect(overlay).toBeInTheDocument();
    });
  });

  describe('Header Section', () => {
    it('renders the main heading', () => {
      render(<Project />);
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.getByText('👨‍💻 Featured Creations')).toBeInTheDocument();
    });

    it('applies correct CSS classes to heading', () => {
      render(<Project />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass(
        'text-2xl',
        'sm:text-3xl',
        'md:text-5xl',
        'font-bold',
        'gradient-text'
      );
    });

    it('renders the description paragraph', () => {
      render(<Project />);
      expect(
        screen.getByText(
          /Check out some of my recent work and open-source contributions/
        )
      ).toBeInTheDocument();
    });

    it('applies correct CSS classes to description', () => {
      render(<Project />);
      const description = screen.getByText(
        /Check out some of my recent work and open-source contributions/
      );
      expect(description).toHaveClass(
        'max-w-[700px]',
        'text-sm',
        'sm:text-base',
        'md:text-xl',
        'text-muted-foreground',
        'px-4'
      );
    });
  });

  describe('Animation Components', () => {
    it('wraps header in FadeIn animation', () => {
      render(<Project />);
      const fadeIn = screen.getByTestId('fade-in');
      expect(fadeIn).toBeInTheDocument();
    });

    it('uses StaggerContainer for project grid', () => {
      render(<Project />);
      const staggerContainer = screen.getByTestId('stagger-container');
      expect(staggerContainer).toBeInTheDocument();
      expect(staggerContainer).toHaveClass(
        'grid',
        'gap-6',
        'sm:gap-8',
        'grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-3'
      );
      expect(staggerContainer).toHaveAttribute('data-delay', '0.2');
    });

    it('wraps each project in StaggerItem', () => {
      render(<Project />);
      const staggerItems = screen.getAllByTestId('stagger-item');
      expect(staggerItems).toHaveLength(7); // 7 projects
    });
  });

  describe('Project Cards', () => {
    it('renders all project cards', () => {
      render(<Project />);
      const projectCards = screen.getAllByTestId('project-card');
      expect(projectCards).toHaveLength(7);
    });

    it('renders Portfolio project with correct data', () => {
      render(<Project />);

      expect(screen.getByText('Portfolio')).toBeInTheDocument();
      expect(
        screen.getByText(
          /A modern, responsive portfolio website built with Next.js/
        )
      ).toBeInTheDocument();
      expect(screen.getByTestId('user-icon')).toBeInTheDocument();

      const portfolioCard = screen
        .getByText('Portfolio')
        .closest('[data-testid="project-card"]');
      expect(portfolioCard).toHaveAttribute(
        'data-link',
        'https://github.com/iamanonymous419/portfolio'
      );
    });

    it('renders Marketverse project with correct data', () => {
      render(<Project />);

      expect(screen.getByText('Marketverse')).toBeInTheDocument();
      expect(
        screen.getByText(
          /A feature-rich e-commerce platform built with Next.js/
        )
      ).toBeInTheDocument();
      expect(screen.getByTestId('external-link-icon')).toBeInTheDocument();

      const marketverseCard = screen
        .getByText('Marketverse')
        .closest('[data-testid="project-card"]');
      expect(marketverseCard).toHaveAttribute(
        'data-link',
        'https://marketverse-phi.vercel.app'
      );
    });

    it('renders Marketverse GitOps project with correct data', () => {
      render(<Project />);

      expect(screen.getByText('Marketverse GitOps')).toBeInTheDocument();
      expect(
        screen.getByText(/DevOps infrastructure for the Marketverse project/)
      ).toBeInTheDocument();
      expect(screen.getByTestId('github-icon')).toBeInTheDocument();
    });

    it('renders CircleCI DevOps Orbs project with correct data', () => {
      render(<Project />);

      expect(screen.getByText('CircleCI DevOps Orbs')).toBeInTheDocument();
      expect(
        screen.getByText(
          /Production-ready CircleCI Orbs for automating Docker workflows/
        )
      ).toBeInTheDocument();
      expect(screen.getByTestId('link-icon')).toBeInTheDocument();
    });

    it('renders Terraform Custom EC2 Module project with correct data', () => {
      render(<Project />);

      expect(
        screen.getByText('Terraform Custom EC2 Module')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Published Terraform module for launching AWS EC2 Spot and On-Demand Instances/
        )
      ).toBeInTheDocument();
      expect(screen.getByTestId('cloud-icon')).toBeInTheDocument();
    });

    it('renders Anoverse npm package project with correct data', () => {
      render(<Project />);

      expect(screen.getByText('Anoverse (npm package)')).toBeInTheDocument();
      expect(
        screen.getByText(
          /Custom NPM package published and integrated with the Marketverse project/
        )
      ).toBeInTheDocument();
      expect(screen.getByTestId('package-icon')).toBeInTheDocument();
    });

    it('renders Marketverse Banking API project with correct data', () => {
      render(<Project />);

      expect(screen.getByText('Marketverse Banking API')).toBeInTheDocument();
      expect(
        screen.getByText(
          /Backend banking API developed with NestJS and MongoDB/
        )
      ).toBeInTheDocument();
      expect(screen.getByTestId('database-icon')).toBeInTheDocument();
    });
  });

  describe('Footer Section', () => {
    it('renders the footer message', () => {
      render(<Project />);
      expect(
        screen.getByText('...developing more projects that push boundaries 😉')
      ).toBeInTheDocument();
    });

    it('applies correct CSS classes to footer', () => {
      render(<Project />);
      const footer = screen.getByText(
        '...developing more projects that push boundaries 😉'
      );
      expect(footer).toHaveClass(
        'text-sm',
        'sm:text-base',
        'text-muted-foreground',
        'italic'
      );
    });

    it('positions footer correctly', () => {
      render(<Project />);
      const footer = screen.getByText(
        '...developing more projects that push boundaries 😉'
      );
      const footerContainer = footer.closest('.text-right');
      expect(footerContainer).toHaveClass(
        'text-right',
        'mt-6',
        'sm:mt-8',
        'px-4'
      );
    });
  });

  describe('Responsive Design', () => {
    it('applies responsive classes to main container', () => {
      render(<Project />);
      const staggerContainer = screen.getByTestId('stagger-container');
      expect(staggerContainer).toHaveClass(
        'grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-3'
      );
    });

    it('applies responsive classes to gaps', () => {
      render(<Project />);
      const staggerContainer = screen.getByTestId('stagger-container');
      expect(staggerContainer).toHaveClass('gap-6', 'sm:gap-8');
    });

    it('applies responsive text sizes to heading', () => {
      render(<Project />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('text-2xl', 'sm:text-3xl', 'md:text-5xl');
    });

    it('applies responsive text sizes to description', () => {
      render(<Project />);
      const description = screen.getByText(
        /Check out some of my recent work and open-source contributions/
      );
      expect(description).toHaveClass('text-sm', 'sm:text-base', 'md:text-xl');
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<Project />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('👨‍💻 Featured Creations');
    });

    it('has descriptive text for screen readers', () => {
      render(<Project />);
      expect(
        screen.getByText(
          /Check out some of my recent work and open-source contributions/
        )
      ).toBeInTheDocument();
    });

    it('provides meaningful content structure', () => {
      render(<Project />);

      // Check that projects have titles and descriptions
      const projectTitles = screen.getAllByTestId('project-title');
      const projectDescriptions = screen.getAllByTestId('project-description');

      expect(projectTitles).toHaveLength(7);
      expect(projectDescriptions).toHaveLength(7);

      projectTitles.forEach(title => {
        expect(title).toHaveTextContent(/\w+/);
      });

      projectDescriptions.forEach(description => {
        expect(description).toHaveTextContent(/\w+/);
      });
    });
  });

  describe('Component Performance', () => {
    it('renders efficiently without unnecessary re-renders', () => {
      const { rerender } = render(<Project />);

      // Component should render the same content on re-render
      rerender(<Project />);

      expect(screen.getAllByTestId('project-card')).toHaveLength(7);
      expect(screen.getByText('👨‍💻 Featured Creations')).toBeInTheDocument();
    });
  });

  describe('Integration with External Components', () => {
    it('correctly passes props to ProjectCard components', () => {
      render(<Project />);

      const projectCards = screen.getAllByTestId('project-card');

      // Check that each project card has required attributes
      projectCards.forEach(card => {
        expect(card).toHaveAttribute('data-link');
        expect(
          card.querySelector('[data-testid="project-title"]')
        ).toBeInTheDocument();
        expect(
          card.querySelector('[data-testid="project-description"]')
        ).toBeInTheDocument();
        expect(
          card.querySelector('[data-testid="project-tags"]')
        ).toBeInTheDocument();
        expect(
          card.querySelector('[data-testid="project-icon"]')
        ).toBeInTheDocument();
      });
    });

    it('correctly integrates with animation components', () => {
      render(<Project />);

      // Check FadeIn integration
      const fadeIn = screen.getByTestId('fade-in');
      expect(fadeIn).toBeInTheDocument();

      // Check StaggerContainer integration
      const staggerContainer = screen.getByTestId('stagger-container');
      expect(staggerContainer).toBeInTheDocument();
      expect(staggerContainer).toHaveAttribute('data-delay', '0.2');

      // Check StaggerItem integration
      const staggerItems = screen.getAllByTestId('stagger-item');
      expect(staggerItems).toHaveLength(7);
    });
  });
});

// Additional test utilities for custom testing scenarios
export const projectTestUtils = {
  // Helper to get project by title
  getProjectByTitle: (title: string) => {
    return screen.getByText(title).closest('[data-testid="project-card"]');
  },

  // Helper to get all project tags
  getAllProjectTags: () => {
    return screen.getAllByTestId('project-tag');
  },

  // Helper to verify project structure
  verifyProjectStructure: (projectTitle: string) => {
    const project = projectTestUtils.getProjectByTitle(projectTitle);
    expect(project).toBeInTheDocument();
    expect(
      project?.querySelector('[data-testid="project-title"]')
    ).toHaveTextContent(projectTitle);
    expect(
      project?.querySelector('[data-testid="project-description"]')
    ).toBeInTheDocument();
    expect(
      project?.querySelector('[data-testid="project-tags"]')
    ).toBeInTheDocument();
    expect(
      project?.querySelector('[data-testid="project-icon"]')
    ).toBeInTheDocument();
    expect(project).toHaveAttribute('data-link');
  },
};
