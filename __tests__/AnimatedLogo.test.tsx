import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AnimatedLogo } from '@/components/AnimatedLogo';

describe('AnimatedLogo', () => {
  it('renders the opening and closing tags correctly', () => {
    render(<AnimatedLogo />);
    expect(screen.getByText('<')).toBeInTheDocument();
    expect(screen.getByText('/>')).toBeInTheDocument();
  });

  it('renders all letters of the word "Anonymous"', () => {
    render(<AnimatedLogo />);

    const expectedCounts: Record<string, number> = {
      A: 1,
      n: 2,
      o: 2,
      y: 1,
      m: 1,
      u: 1,
      s: 1,
    };

    Object.entries(expectedCounts).forEach(([letter, count]) => {
      const elements = screen.getAllByText(letter);
      expect(elements).toHaveLength(count);
    });
  });
});
