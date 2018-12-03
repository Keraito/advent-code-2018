import { mapClaim } from './day3';
describe('Day 3 Part 3:', () => {
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
});
