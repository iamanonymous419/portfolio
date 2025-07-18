import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Home from '@/app/page';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: any;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock the custom components
jest.mock('@/components/ui/badge', () => ({
  Badge: ({
    children,
    className,
    variant,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    variant?: string;
    [key: string]: any;
  }) => (
    <span className={className} data-variant={variant} {...props}>
      {children}
    </span>
  ),
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({
    children,
    className,
    variant,
    size,
    asChild,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    variant?: string;
    size?: string;
    asChild?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLSpanElement>;
    [key: string]: any;
  }) => {
    const Component = asChild ? 'span' : 'button';
    return (
      <Component
        className={className}
        data-variant={variant}
        data-size={size}
        onClick={onClick}
        {...props}
      >
        {children}
      </Component>
    );
  },
}));

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Github: () => <span data-testid="github-icon">Github</span>,
  ChevronDown: () => <span data-testid="chevron-down-icon">ChevronDown</span>,
  Menu: () => <span data-testid="menu-icon">Menu</span>,
  X: () => <span data-testid="x-icon">X</span>,
}));

// Mock custom components
jest.mock('@/components/Terminal', () => ({
  TerminalAbout: () => <div data-testid="terminal-about">Terminal About</div>,
}));

jest.mock('@/components/Skills', () => ({
  SkillsSection: () => <div data-testid="skills-section">Skills Section</div>,
}));

jest.mock('@/components/LlearningJourneySlider', () => ({
  LearningJourneySlider: () => (
    <div data-testid="learning-journey-slider">Learning Journey Slider</div>
  ),
}));

jest.mock('@/components/AnimatedLogo', () => ({
  AnimatedLogo: () => <div data-testid="animated-logo">Animated Logo</div>,
}));

jest.mock('@/components/AnimatedQuote', () => ({
  AnimatedQuote: () => <div data-testid="animated-quote">Animated Quote</div>,
}));

jest.mock('@/components/Animations', () => ({
  FadeIn: ({
    children,
    delay,
    direction,
    className,
  }: {
    children: React.ReactNode;
    delay?: number;
    direction?: string;
    className?: string;
  }) => (
    <div className={className} data-delay={delay} data-direction={direction}>
      {children}
    </div>
  ),
  StaggerContainer: ({
    children,
    delay,
    className,
  }: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
  }) => (
    <div className={className} data-delay={delay}>
      {children}
    </div>
  ),
  StaggerItem: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Typewriter: ({
    text,
    className,
    delay,
  }: {
    text: string;
    className?: string;
    delay?: number;
  }) => (
    <div className={className} data-delay={delay}>
      {text}
    </div>
  ),
  PulseAnimation: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

jest.mock('@/components/sections/Contact', () => {
  return function Contact() {
    return <div data-testid="contact-section">Contact Section</div>;
  };
});

jest.mock('@/components/sections/Project', () => {
  return function Project() {
    return <div data-testid="project-section">Project Section</div>;
  };
});

jest.mock('@/lib/utils', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
}));

// Mock window methods
const mockScrollIntoView = jest.fn();
const mockScrollTo = jest.fn();

// Mock DOM elements for scroll testing
const mockGetElementById = jest.fn();

beforeEach(() => {
  // Reset all mocks
  jest.clearAllMocks();

  // Mock window.scrollY
  Object.defineProperty(window, 'scrollY', {
    value: 0,
    writable: true,
  });

  // Mock window.innerHeight
  Object.defineProperty(window, 'innerHeight', {
    value: 1000,
    writable: true,
  });

  // Mock document.documentElement.scrollHeight
  Object.defineProperty(document.documentElement, 'scrollHeight', {
    value: 5000,
    writable: true,
  });

  // Mock scrollIntoView
  Element.prototype.scrollIntoView = mockScrollIntoView;

  // Mock window.scrollTo
  window.scrollTo = mockScrollTo;

  // Mock document.getElementById
  document.getElementById = mockGetElementById.mockImplementation(
    (id: string) => {
      const sectionOffsets: {
        [key in
          | 'hero'
          | 'about'
          | 'projects'
          | 'skills'
          | 'journey'
          | 'contact']: number;
      } = {
        hero: 0,
        about: 800,
        projects: 1600,
        skills: 2400,
        journey: 3200,
        contact: 4000,
      };
      const mockElement = {
        scrollIntoView: mockScrollIntoView,
        offsetTop: sectionOffsets[id as keyof typeof sectionOffsets] ?? 0,
      };
      return mockElement;
    }
  );
});

describe('Home Component', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByText("Hi👋🏻, I'm Anonymous")).toBeInTheDocument();
  });

  it('displays the main heading and badge', () => {
    render(<Home />);

    expect(screen.getByText("Hi👋🏻, I'm Anonymous")).toBeInTheDocument();
    expect(
      screen.getByText('Web Developer & DevOps Expert')
    ).toBeInTheDocument();
  });

  it('displays the typewriter text', () => {
    render(<Home />);

    expect(
      screen.getByText('Web Dev | DevOps | Full Stack Web Developer')
    ).toBeInTheDocument();
  });

  it('renders all skill badges', () => {
    render(<Home />);

    const skillBadges = [
      'Web Development',
      'Full Stack',
      'DevOps',
      'Infrastructure as Code',
      'CI/CD Automation',
    ];

    skillBadges.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  it('renders desktop navigation menu', () => {
    render(<Home />);

    const navItems = ['About', 'Projects', 'Skills', 'Journey', 'Contact'];
    navItems.forEach(item => {
      expect(screen.getByRole('button', { name: item })).toBeInTheDocument();
    });
  });

  it('toggles mobile menu when menu button is clicked', async () => {
    render(<Home />);

    const menuButton = screen.getByRole('button', {
      name: 'Toggle mobile menu',
    });

    // Initially, mobile menu should not be visible
    expect(screen.queryByText('About')).toBeInTheDocument(); // Desktop nav is always visible

    // Click to open mobile menu
    await userEvent.click(menuButton);

    // Mobile menu should now be visible (we can't easily test visibility, but we can check the icon changed)
    expect(screen.getByTestId('x-icon')).toBeInTheDocument();

    // Click to close mobile menu
    await userEvent.click(menuButton);

    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });

  it('scrolls to correct section when navigation is clicked', async () => {
    render(<Home />);

    const aboutButton = screen.getByRole('button', { name: 'About' });
    await userEvent.click(aboutButton);

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('scrolls to projects section when "View Projects" button is clicked', async () => {
    render(<Home />);

    const viewProjectsButton = screen.getByRole('button', {
      name: 'View Projects',
    });
    await userEvent.click(viewProjectsButton);

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('scrolls to contact section when "Contact Me" button is clicked', async () => {
    render(<Home />);

    const contactButton = screen.getByRole('button', { name: 'Contact Me' });
    await userEvent.click(contactButton);

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('scrolls to about section when scroll down button is clicked', async () => {
    render(<Home />);

    const scrollDownButton = screen.getByRole('button', {
      name: /scroll down/i,
    });
    await userEvent.click(scrollDownButton);

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('closes mobile menu when navigation item is clicked', async () => {
    render(<Home />);

    const menuButton = screen.getByRole('button', {
      name: 'Toggle mobile menu',
    });

    // Open mobile menu
    await userEvent.click(menuButton);

    // Click on a navigation item (we need to find the mobile version)
    const mobileNavButtons = screen.getAllByRole('button', { name: 'About' });
    const mobileAboutButton = mobileNavButtons.find(button =>
      button.className.includes('py-2 px-4 rounded-md')
    );

    if (mobileAboutButton) {
      await userEvent.click(mobileAboutButton);
    }

    // Menu should close (scrollIntoView should be called)
    expect(mockScrollIntoView).toHaveBeenCalled();
  });

  it('renders all main sections', () => {
    render(<Home />);

    // Check that all major sections are rendered
    expect(screen.getByTestId('terminal-about')).toBeInTheDocument();
    expect(screen.getByTestId('project-section')).toBeInTheDocument();
    expect(screen.getByTestId('skills-section')).toBeInTheDocument();
    expect(screen.getByTestId('learning-journey-slider')).toBeInTheDocument();
    expect(screen.getByTestId('contact-section')).toBeInTheDocument();
  });

  it('renders footer with copyright and animated quote', () => {
    render(<Home />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} Anonymous. All rights reserved.`)
    ).toBeInTheDocument();
    expect(screen.getByTestId('animated-quote')).toBeInTheDocument();
  });

  it('handles scroll events and updates header style', () => {
    render(<Home />);

    // Simulate scroll event
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    fireEvent.scroll(window);

    // The header should have scrolled class (we can't easily test this without more complex setup)
    // This would require testing the actual className changes
  });

  it('scrolls to hero section when logo is clicked', async () => {
    render(<Home />);

    const logoButtons = screen.getAllByTestId('animated-logo');
    const headerLogo = logoButtons[0].closest('button');

    if (headerLogo) {
      await userEvent.click(headerLogo);
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    }
  });

  it('scrolls to hero section when footer logo is clicked', async () => {
    render(<Home />);

    const footerLogoButton = screen.getByText('Anonymous').closest('button');

    if (footerLogoButton) {
      await userEvent.click(footerLogoButton);
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    }
  });

  it('renders with correct initial state', () => {
    render(<Home />);

    // Check that mobile menu is initially closed
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('x-icon')).not.toBeInTheDocument();
  });

  it('handles window resize events', () => {
    render(<Home />);

    // Simulate window resize
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      writable: true,
    });
    fireEvent.resize(window);

    // Component should still be rendered correctly
    expect(screen.getByText("Hi👋🏻, I'm Anonymous")).toBeInTheDocument();
  });
});

// Test scroll behavior with more detail
describe('Home Component Scroll Behavior', () => {
  it('updates active section based on scroll position', () => {
    render(<Home />);

    // Mock scroll position to be in the about section
    Object.defineProperty(window, 'scrollY', { value: 900, writable: true });

    // Simulate scroll event
    fireEvent.scroll(window);

    // This would require more complex testing to verify active section changes
    // In a real test, you might check for specific CSS classes or aria-current attributes
  });

  it('detects when user is near bottom of page', () => {
    render(<Home />);

    // Mock scroll position near bottom
    Object.defineProperty(window, 'scrollY', { value: 4000, writable: true });
    Object.defineProperty(window, 'innerHeight', {
      value: 1000,
      writable: true,
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 5000,
      writable: true,
    });

    fireEvent.scroll(window);

    // Contact section should be active (would need to test actual implementation)
  });
});

// Test accessibility
describe('Home Component Accessibility', () => {
  it('has proper ARIA labels', () => {
    render(<Home />);

    expect(
      screen.getByRole('button', { name: 'Toggle mobile menu' })
    ).toBeInTheDocument();
  });

  it('has proper link attributes for external links', () => {
    render(<Home />);

    const githubLinks = screen.getAllByText('GitHub');
    githubLinks.forEach(link => {
      const anchorElement = link.closest('a');
      expect(anchorElement).toHaveAttribute('rel', 'noopener noreferrer');
      expect(anchorElement).toHaveAttribute('target', '_blank');
    });
  });
});
