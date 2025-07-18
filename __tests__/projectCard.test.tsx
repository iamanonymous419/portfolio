import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProjectCard } from '@/components/ProjectCard';
import React from 'react';
import { User } from 'lucide-react';

describe('ProjectCard', () => {
  const mockProps = {
    title: 'DevOps Dashboard',
    description: 'A dashboard for monitoring pipelines and clusters.',
    link: 'https://example.com',
    tags: ['ArgoCD', 'Kubernetes', 'Terraform'],
    icon: <User data-testid="external-icon" />,
  };

  it('renders title and description', () => {
    render(<ProjectCard {...mockProps} />);
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  it('renders all tags as badges', () => {
    render(<ProjectCard {...mockProps} />);
    mockProps.tags.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it('has a link to view the project that opens in a new tab', () => {
    render(<ProjectCard {...mockProps} />);
    const link = screen.getByRole('link', { name: /view project/i });
    expect(link).toHaveAttribute('href', mockProps.link);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('displays the icon inside the button', () => {
    render(<ProjectCard {...mockProps} />);
    expect(screen.getByTestId('external-icon')).toBeInTheDocument();
  });
});
