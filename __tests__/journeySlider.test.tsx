import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { LearningJourneySlider } from '@/components/LlearningJourneySlider';

jest.useFakeTimers();

describe('LearningJourneySlider', () => {
  beforeEach(() => {
    // Resize the window to desktop by default
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('renders heading and description', () => {
    render(<LearningJourneySlider />);
    expect(screen.getByText('📈 My Learning Journey')).toBeInTheDocument();
    expect(
      screen.getByText('Consistently improving my skills and knowledge')
    ).toBeInTheDocument();
  });

  it('renders initial items based on screen width (2 for desktop)', () => {
    render(<LearningJourneySlider />);
    const cards = screen
      .getAllByText(/^[\w\s&,.]+$/)
      .filter(el => el.className.includes('font-bold'));
    expect(cards.length).toBe(2);
  });

  it('disables navigation during transition', () => {
    render(<LearningJourneySlider />);
    const nextButton = screen.getAllByRole('button')[2];

    // Fire rapidly twice
    act(() => {
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      jest.advanceTimersByTime(150);
    });

    // Still only moved one slide
    const cards = screen
      .getAllByText(/^[\w\s&,.]+$/)
      .filter(el => el.className.includes('font-bold'));
    expect(cards.length).toBe(2);
  });

  it('shows correct number of dot indicators and highlights active one', () => {
    render(<LearningJourneySlider />);
    const indicators = screen
      .getAllByRole('button')
      .filter(btn => btn.className.includes('rounded-full'));
    expect(indicators.length).toBeGreaterThan(5);
    const activeDot = indicators.find(dot =>
      dot.className.includes('bg-primary shadow-lg')
    );
    expect(activeDot).toBeInTheDocument();
  });

  it('navigates directly using dot indicators', () => {
    render(<LearningJourneySlider />);
    const indicators = screen
      .getAllByRole('button')
      .filter(btn => btn.className.includes('rounded-full'));
    act(() => {
      fireEvent.click(indicators[3]);
      jest.advanceTimersByTime(200);
    });
    const activeDot = indicators[3];
    expect(activeDot.className).toContain('bg-primary');
  });

  it('handles window width < 768 (mobile)', () => {
    window.innerWidth = 500;
    render(<LearningJourneySlider />);
    const cards = screen
      .getAllByText(/^[\w\s&,.]+$/)
      .filter(el => el.className.includes('font-bold'));
    expect(cards.length).toBe(1);
  });
});
