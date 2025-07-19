import { describe, test, expect } from 'vitest';
import { formatRecurrenceRule } from '../utils/recurrenceUtils.js';

describe('formatRecurrenceRule', () => {
  test('returns correct daily rule string for interval 1', () => {
    const rule = { frequency: 'daily', interval: 1 };
    const result = formatRecurrenceRule(rule);
    expect(result).toBe('Repeats day');
  });

  test('returns correct daily rule string for interval 2', () => {
    const rule = { frequency: 'daily', interval: 2 };
    const result = formatRecurrenceRule(rule);
    expect(result).toBe('Repeats every 2 days');
  });

  test('returns correct weekly rule string', () => {
    const rule = { frequency: 'weekly', interval: 1 };
    const result = formatRecurrenceRule(rule);
    expect(result).toBe('Repeats week');
  });
});
