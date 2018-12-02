import { scanBoxId, calculateCheckSum, myInput } from './day2';
describe('Day 2 Box Scanner Part 1', () => {
  const examples = [
    ['abcdef', [false, false]],
    ['bababc', [true, true]],
    ['abbcde', [true, false]],
    ['abcccd', [false, true]],
    ['aabcdd', [true, false]],
    ['abcdee', [true, false]],
    ['ababab', [false, true]],
  ];
  examples.forEach(([input, expectedResult]) => {
    test(`should correctly destructure ${input}`, () => {
      expect(scanBoxId(input)).toEqual(expectedResult);
    });
  });

  test('should calculate the checksum correctly', () => {
    const listOfBoxIds = examples.reduce(
      (prev, [input, expectedResult]) => prev + `${input}\n`,
      ''
    );
    expect(calculateCheckSum(listOfBoxIds)).toBe(12);
  });

  test('should calculate the checksum for my input correctly', () => {
    expect(calculateCheckSum(myInput)).toBe(5368);
  });
});
