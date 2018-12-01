import {
  chronalCalibrate,
  personalInput,
  repeatingchronalCalibrate,
} from './day1';

describe('Day 1 Chronal Calibration Part 1', () => {
  const examples = [
    [`+1, -2, +3, +1`, 3],
    [`+1, +1, +1`, 3],
    [`+1, +1, -2`, 0],
    [`-1, -2, -3`, -6],
  ];
  examples.forEach(([input, expectedResult]) => {
    test(`should correctly calculate ${expectedResult} for ${input}`, () => {
      expect(chronalCalibrate(input)).toBe(expectedResult);
    });
  });

  test('should correctly calculate my personal input', () => {
    expect(chronalCalibrate(personalInput, '\n')).toBe(420);
  });
});

describe('Day 1 Chronal Calibration Part 2', () => {
  const examples = [
    [`+1, -2, +3, +1`, 2],
    [`+1, -1`, 0],
    [`+3, +3, +4, -2, -4`, 10],
    [`-6, +3, +8, +5, -6`, 5],
    [`+7, +7, -2, -7, -4`, 14],
  ];
  examples.forEach(([input, expectedResult]) => {
    test(`should correctly calculate ${expectedResult} for repeated ${input}`, () => {
      expect(repeatingchronalCalibrate(input)).toBe(expectedResult);
    });
  });

  test('should correctly calculate my personal input', () => {
    expect(repeatingchronalCalibrate(personalInput, '\n')).toBe(227);
  });
});
