import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />);
    expect(screen.getByText('Recurring Date Picker')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<App />);
    expect(screen.getByText(/Create beautiful recurring schedules/)).toBeInTheDocument();
  });

  it('renders the footer text', () => {
    render(<App />);
    expect(screen.getByText(/Built with React & Tailwind CSS/)).toBeInTheDocument();
  });
}); 