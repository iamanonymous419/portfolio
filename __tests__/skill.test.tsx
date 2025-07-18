import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { SkillsSection } from '@/components/Skills';

describe('SkillsSection', () => {
  beforeEach(() => {
    jest.useFakeTimers(); // <--- enable fake timers before each test
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers(); // safely complete all timers
    jest.useRealTimers(); // reset to real timers
  });

  it('renders correctly with default Frontend tab active', () => {
    render(<SkillsSection />);
    expect(
      screen.getByText('Technologies and tools I work with')
    ).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders all category tabs', () => {
    render(<SkillsSection />);
    ['Frontend', 'Backend', 'DevOps', 'Others'].forEach(tab =>
      expect(screen.getByText(tab)).toBeInTheDocument()
    );
  });
});
