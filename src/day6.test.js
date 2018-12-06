import { getCandidateCoordinates, largestArea, myInput, part2 } from './day6';
describe('Day 6 Part 1:', () => {
  const example = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`;
  test('should get the correct candidate coordinates', () => {
    expect(getCandidateCoordinates(example)).toEqual([[3, 4], [5, 5]]);
  });
  test('should get the largest area for example', () => {
    expect(largestArea(example)).toBe(17);
  });
  test('should get the largest area for myInput', () => {
    // expect(largestArea(myInput)).toBe(4171);
  });
  test('should get the largest area for myInput', () => {
    expect(part2(example, 32)).toBe(16);
  });
  test('should get the largest area for myInput', () => {
    expect(part2(myInput, 10000)).toBe(39545);
  });
});
