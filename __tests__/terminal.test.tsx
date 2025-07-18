import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TerminalAbout } from '@/components/Terminal';

describe('TerminalAbout Component', () => {
  it('renders terminal header', () => {
    render(<TerminalAbout />);
    expect(screen.getByText(/Terminal/i)).toBeInTheDocument();
  });

  it('renders user object structure', async () => {
    render(<TerminalAbout />);
    expect(screen.getByText(/const me = {/i)).toBeInTheDocument();
    expect(screen.getByText(/nickname/i)).toBeInTheDocument();
    expect(screen.getByText(/focus/i)).toBeInTheDocument();
  });

  it('displays blinking cursor', async () => {
    render(<TerminalAbout />);
    const cursor = await screen.findByText('|');
    expect(cursor).toBeInTheDocument();
  });
});
