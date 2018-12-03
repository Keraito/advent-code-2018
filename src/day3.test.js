import {
  mapClaim,
  getOverlappingFabric,
  myInput,
  getNonOverlappingFabric,
} from './day3';
describe('Day 3 Part 1:', () => {
  test('should create a correct map for the example', () => {
    const example = '#123 @ 3,2: 5x4';
    expect(mapClaim(example)).toEqual([
      '#123',
      {
        3: {
          4: '#123',
          5: '#123',
          6: '#123',
          7: '#123',
          8: '#123',
        },
        4: {
          4: '#123',
          5: '#123',
          6: '#123',
          7: '#123',
          8: '#123',
        },
        5: {
          4: '#123',
          5: '#123',
          6: '#123',
          7: '#123',
          8: '#123',
        },
        6: {
          4: '#123',
          5: '#123',
          6: '#123',
          7: '#123',
          8: '#123',
        },
      },
    ]);
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
describe('Day 3 Part 2:', () => {
  test('should get the single non overlapping fabric', () => {
    expect(getNonOverlappingFabric(myInput)).toHaveProperty('#806');
  });
});
