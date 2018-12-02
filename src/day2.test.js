import { scanBoxId, calculateCheckSum, myInput } from './day2';
describe('Day 2 Box Scanner Part 1', () => {
  const examples = [
    ['abcdef', { twice: false, thrice: false }],
    ['bababc', { twice: true, thrice: true }],
    ['abbcde', { twice: true, thrice: false }],
    ['abcccd', { twice: false, thrice: true }],
    ['aabcdd', { twice: true, thrice: false }],
    ['abcdee', { twice: true, thrice: false }],
    ['ababab', { twice: false, thrice: true }],
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
