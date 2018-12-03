import { mapClaim, getOverlappingFabric, myInput } from './day3';
describe('Day 3 Part 1:', () => {
  test('should create a correct map for the example', () => {
    const example = '#123 @ 3,2: 5x4';
    expect(mapClaim(example)).toEqual({
      3: {
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
      },
      4: {
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
      },
      5: {
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
      },
      6: {
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
      },
    });
  });

  test('should correctly calculate overlapping fabric for example', () => {
    const claims = `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`;
    expect(getOverlappingFabric(claims)).toBe(4);
  });

  test('should correctly calculate overlapping fabric for my input', () => {
    expect(getOverlappingFabric(myInput)).toBe(104241);
  });
});
