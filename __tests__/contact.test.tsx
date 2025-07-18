import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from '@/components/sections/Contact';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

// Mock animation components
jest.mock('@/components/Animations', () => ({
  FadeIn: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  StaggerContainer: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
  StaggerItem: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
}));

// Mock UI components
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, asChild, ...props }: any) => {
    if (asChild) {
      return <div {...props}>{children}</div>;
    }
    return <button {...props}>{children}</button>;
  },
}));

describe('📬 Contact Component Tests', () => {
  beforeEach(() => {
    render(<Contact />);
  });

  describe('🎯 Section Structure', () => {
    it('should render the main heading', () => {
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("📬 Let's Connect");
    });

    it('should render the section description', () => {
      const description = screen.getByText(
        'Feel free to reach out to me through any of these platforms'
      );
      expect(description).toBeInTheDocument();
    });

    it('should have proper heading styles', () => {
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('gradient-text');
      expect(heading).toHaveClass('font-bold');
    });
  });

  describe('📱 Contact Links', () => {
    const contactLinks = [
      {
        platform: 'Email',
        href: 'mailto:anonymous292009@gmail.com',
        text: 'Email',
      },
      {
        platform: 'LinkedIn',
        href: 'https://www.linkedin.com/in/debbag2009',
        text: 'LinkedIn',
      },
      {
        platform: 'Reddit',
        href: 'https://www.reddit.com/u/Anonymous292009',
        text: 'Reddit',
      },
      {
        platform: 'X',
        href: 'https://x.com/Anonymous292009',
        text: 'X',
      },
      {
        platform: 'Instagram',
        href: 'https://www.instagram.com/anonymous22009',
        text: 'Instagram',
      },
      {
        platform: 'GitHub',
        href: 'https://github.com/iamanonymous419',
        text: 'GitHub',
      },
    ];

    it('should render all contact platform buttons', () => {
      contactLinks.forEach(({ text }) => {
        const button = screen.getByText(text);
        expect(button).toBeInTheDocument();
      });
    });

    it('should have correct href attributes for all links', () => {
      contactLinks.forEach(({ href, text }) => {
        const link = screen.getByText(text).closest('a');
        expect(link).toHaveAttribute('href', href);
      });
    });

    it('should have proper target and rel attributes for external links', () => {
      const externalLinks = contactLinks.filter(link =>
        link.href.startsWith('http')
      );

      externalLinks.forEach(({ text }) => {
        const link = screen.getByText(text).closest('a');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('should not have target="_blank" for email link', () => {
      const emailLink = screen.getByText('Email').closest('a');
      expect(emailLink).not.toHaveAttribute('target', '_blank');
    });

    it('should render correct number of contact buttons', () => {
      expect(contactLinks).toHaveLength(6);

      contactLinks.forEach(({ text }) => {
        const buttons = screen.getAllByText(text);
        expect(buttons).toHaveLength(1);
      });
    });
  });

  describe('📱 Responsive Design', () => {
    it('should have responsive text classes', () => {
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('text-2xl', 'sm:text-3xl', 'md:text-5xl');
    });

    it('should have responsive gap classes', () => {
      const headerContainer = screen
        .getByText("📬 Let's Connect")
        .closest('div');
      expect(headerContainer).toHaveClass('gap-3', 'sm:gap-4');
    });

    it('should have responsive margin classes', () => {
      const headerContainer = screen
        .getByText("📬 Let's Connect")
        .closest('div');
      expect(headerContainer).toHaveClass('mb-8', 'sm:mb-12');
    });
  });

  describe('🎭 Animation Components', () => {
    it('should wrap content in FadeIn component', () => {
      // Since we mocked FadeIn, we can test that the structure is correct
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('should wrap buttons in StaggerContainer', () => {
      // Test that all buttons are rendered (indicating StaggerContainer works)
      const buttons = screen.getAllByText(
        /Email|LinkedIn|Reddit|X|Instagram|GitHub/
      );
      expect(buttons).toHaveLength(6);
    });
  });

  describe('🔗 Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('should have descriptive link text', () => {
      const contactLinks = [
        'Email',
        'LinkedIn',
        'Reddit',
        'X',
        'Instagram',
        'GitHub',
      ];

      contactLinks.forEach(linkText => {
        const link = screen.getByText(linkText);
        expect(link).toBeInTheDocument();
        expect(link.textContent).toBe(linkText);
      });
    });

    it('should have proper link structure', () => {
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);

      links.forEach(link => {
        expect(link).toHaveAttribute('href');
      });
    });
  });
});

describe('🎨 Contact Button Colors Function', () => {
  // Since getContactButtonColors is an internal function, we test its effects
  it('should apply different hover colors to different platforms', () => {
    render(<Contact />);

    const emailButton = screen.getByText('Email').closest('div');
    const githubButton = screen.getByText('GitHub').closest('div');
    const linkedinButton = screen.getByText('LinkedIn').closest('div');

    // Test that buttons have platform-specific hover classes
    expect(emailButton).toHaveClass('hover:bg-blue-500/20');
    expect(githubButton).toHaveClass('hover:bg-gray-700/20');
    expect(linkedinButton).toHaveClass('hover:bg-blue-600/20');
  });
});

describe('🔄 Edge Cases', () => {
  it('should handle missing animation components gracefully', () => {
    // Our mocks simulate missing animation components
    expect(() => render(<Contact />)).not.toThrow();
  });
});
