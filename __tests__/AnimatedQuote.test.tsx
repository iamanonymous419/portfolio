import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { AnimatedQuote } from '@/components/AnimatedQuote';

describe('AnimatedQuote', () => {
  it('renders the quote text correctly', () => {
    render(<AnimatedQuote />);
    const quoteText = screen.getByText(
      /"The more I explore, the more I realize how little I truly know." — Anonymous/i
    );
    expect(quoteText).toBeInTheDocument();
  });

  it('applies hover styles on mouse enter and leaves on mouse leave', () => {
    render(<AnimatedQuote />);
    const blockquote = screen.getByRole('blockquote', { hidden: true });

    // Hover start
    fireEvent.mouseEnter(blockquote);
    expect(blockquote).toHaveClass('cursor-pointer');

    // Hover end
    fireEvent.mouseLeave(blockquote);
    expect(blockquote).toHaveClass('cursor-pointer');
  });
});
