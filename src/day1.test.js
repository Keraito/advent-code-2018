import chronalCalibrate, { personalInput } from './day1';

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
