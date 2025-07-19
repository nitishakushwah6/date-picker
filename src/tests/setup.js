import '@testing-library/jest-dom';

// Mock CSS imports
vi.mock('*.css', () => ({}));
vi.mock('*.scss', () => ({}));

// Mock react-datepicker CSS
vi.mock('react-datepicker/dist/react-datepicker.css', () => ({}));

// Mock navigator.clipboard for copy functionality
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
});
