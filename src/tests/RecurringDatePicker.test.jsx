import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RecurringDatePicker from '../components/RecurringDatePicker';

describe('RecurringDatePicker', () => {
  it('renders recurrence pattern section', () => {
    render(<RecurringDatePicker />);
    expect(screen.getByText('Recurrence Pattern')).toBeInTheDocument();
  });

  it('renders frequency buttons', () => {
    render(<RecurringDatePicker />);
    expect(screen.getAllByText('Daily')).toHaveLength(2); // Button and span
    expect(screen.getByText('Weekly')).toBeInTheDocument();
    expect(screen.getByText('Monthly')).toBeInTheDocument();
    expect(screen.getByText('Yearly')).toBeInTheDocument();
  });

  it('renders interval settings section', () => {
    render(<RecurringDatePicker />);
    expect(screen.getByText('Interval Settings')).toBeInTheDocument();
  });
});
