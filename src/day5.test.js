import { reactPolymer, myInput } from './day5';

describe('Day 5 Part 1:', () => {
  const examples = [
    ['aA', ''],
    ['abBA', ''],
    ['abAB', 'abAB'],
    ['aabAAB', 'aabAAB'],
    ['dabAcCaCBAcCcaDA', 'dabCBAcaDA'],
  ];
  examples.forEach(([input, expectedResult]) =>
    test(`should correctly react the example polymer ${input}`, () => {
      expect(reactPolymer(input)).toBe(expectedResult);
    })
  );
  test('should correctly react my polymer', () => {
    expect(reactPolymer(myInput).length).toBe(9202);
  });
});
