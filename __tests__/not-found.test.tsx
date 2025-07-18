import { render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('NotFound Page', () => {
  beforeEach(() => {
    // Mock router back button if needed
    (useRouter as jest.Mock).mockReturnValue({ back: jest.fn() });
  });

  it('renders the 404 heading', () => {
    render(<NotFound />);
    const heading = screen.getByText('404');
    expect(heading).toBeInTheDocument();
  });

  it('displays the error message', () => {
    render(<NotFound />);
    const message = screen.getByText(/Oops! Page Not Found/i);
    expect(message).toBeInTheDocument();
  });

  it('displays the home button with icon', () => {
    render(<NotFound />);
    const homeBtn = screen.getByRole('link', { name: /back to home/i });
    expect(homeBtn).toBeInTheDocument();
    expect(homeBtn).toHaveAttribute('href', '/');
  });

  it('displays go back button', () => {
    render(<NotFound />);
    const goBack = screen.getByRole('button', { name: /go back/i });
    expect(goBack).toBeInTheDocument();
  });

  it('has useful section links', () => {
    render(<NotFound />);
    const aboutLink = screen.getByRole('link', { name: /about me/i });
    const projectsLink = screen.getByRole('link', { name: /projects/i });
    const skillsLink = screen.getByRole('link', { name: /skills/i });
    const contactLink = screen.getByRole('link', { name: /contact/i });

    expect(aboutLink).toHaveAttribute('href', '/#about');
    expect(projectsLink).toHaveAttribute('href', '/#projects');
    expect(skillsLink).toHaveAttribute('href', '/#skills');
    expect(contactLink).toHaveAttribute('href', '/#contact');
  });

  it('renders the quote at the bottom', () => {
    render(<NotFound />);
    const quote = screen.getByText(/Even the best developers encounter 404s/i);
    expect(quote).toBeInTheDocument();
  });
});
