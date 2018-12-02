import { scanBoxId, calculateCheckSum, myInput, matchBoxes } from './day2';
describe('Day 2 Part 1: Box Scanner', () => {
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

describe('Day 2 Part 2: Boxes Matcher', () => {
  test('should correctly match the example', () => {
    const example = `abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz`;
    expect(matchBoxes(example)).toBe('fgij');
  });

  test('should correctly match my input', () => {
    expect(matchBoxes(myInput)).toBe('cvgywxqubnuaefmsljdrpfzyi');
  });
});
