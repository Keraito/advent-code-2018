const parseInfo = information =>
  information
    .split(' ')
    .map(Number)
    .filter(Number.isInteger);

const getHighestScore = information =>
  Math.max(...playMarbleGame(...parseInfo(information))[1]);

const playMarbleGame = (nPlayers, nMarbles) =>
  new Array(nMarbles + 1).fill(false).reduce(
    ([marbles, scores, currentMarbleIndex], _, marbleNumber) => {
      if (marbleNumber === 0) {
        return [[0], scores, 0];
      }
      const placedMarbles = marbles.length;
      if (marbleNumber % 23 === 0) {
        const removeMarbleIndex =
          (placedMarbles + currentMarbleIndex - 7) % placedMarbles;
        const removedMarbleNumber = marbles.splice(removeMarbleIndex, 1)[0];
        const points = marbleNumber + removedMarbleNumber;
        const currentPlayerIndex = (marbleNumber - 1) % nPlayers;
        scores[currentPlayerIndex] += points;
        return [marbles, scores, removeMarbleIndex];
      } else {
        // const afterMarbleIndex = (currentMarbleIndex + 1) % placedMarbles;
        const beforeMarbleIndex = (currentMarbleIndex + 2) % placedMarbles;
        marbles.splice(beforeMarbleIndex, 0, marbleNumber);
        return [marbles, scores, beforeMarbleIndex];
      }
    },
    [[], new Array(nPlayers).fill(0), 0]
  );

const smallExample = [`9 players; last marble is worth 25 points`, 32];

const examples = [
  [`10 players; last marble is worth 1618 points`, 8317],
  [`13 players; last marble is worth 7999 points`, 146373],
  [`17 players; last marble is worth 1104 points`, 2764],
  [`21 players; last marble is worth 6111 points`, 54718],
  [`30 players; last marble is worth 5807 points`, 37305],
];

const myInput = `424 players; last marble is worth 71482 points`;

describe('Day 9 Part 1:', () => {
  test('should correctly parse the example string into the correct #players and #marbles', () => {
    expect(parseInfo(smallExample[0])).toEqual([9, 25]);
  });
  test('should correctly parse my input into the correct #players and #marbles', () => {
    expect(parseInfo(myInput)).toEqual([424, 71482]);
  });
  test('should get the highest score for small example', () => {
    expect(getHighestScore(smallExample[0])).toBe(smallExample[1]);
  });
  examples.forEach(([info, highScore]) => {
    test(`should get the highest score for "${info}"`, () => {
      expect(getHighestScore(info)).toBe(highScore);
    });
  });

  test('should get the highest score for my input', () => {
    expect(getHighestScore(myInput)).toBe(408679);
  });
});
