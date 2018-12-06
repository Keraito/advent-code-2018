const coordinateIsSurrounded = ([coorX, coorY], coordinatesList) =>
  coordinatesList
    .reduce(
      ([leftUp, rightUp, rightDown, leftDown], [currX, currY]) => [
        leftUp || (currX < coorX && currY < coorY),
        rightUp || (currX > coorX && currY < coorY),
        rightDown || (currX > coorX && currY > coorY),
        leftDown || (currX < coorX && currY > coorY),
      ],
      [false, false, false, false]
    )
    .reduce((prev, curr) => prev && curr);

const parseCoordinates = coordinates =>
  coordinates.split('\n').map(coordinate => coordinate.split(', ').map(Number));

export const getCandidateCoordinates = coordinates => {
  const parsedCoordinates = parseCoordinates(coordinates);
  return parsedCoordinates.filter(coordinate =>
    coordinateIsSurrounded(coordinate, parsedCoordinates)
  );
};

const manhattenDistance = ([firstX, firstY], [secondX, secondY]) =>
  Math.abs(firstX - secondX) + Math.abs(firstY - secondY);

export const createManhattenMap = coordinates => {
  const parsedCoordinates = parseCoordinates(coordinates);
  const [maxX, maxY] = parsedCoordinates.reduce(
    ([prevX, prevY], [currX, currY]) => [
      currX > prevX ? currX : prevX,
      currY > prevY ? currY : prevY,
    ],
    [0, 0]
  );

  const initialManhattenMap = new Array(maxX + 1).fill(
    new Array(maxY + 1).fill(undefined)
  );
  const finalManhattenMap = initialManhattenMap.map((yCoordinates, xCoor) =>
    yCoordinates.map((value, yCoor) => {
      const manhattenDistances = parsedCoordinates.map(curr =>
        manhattenDistance(curr, [xCoor, yCoor])
      );
      const minimalDistance = Math.min(...manhattenDistances);
      const minimalIndex = manhattenDistances.indexOf(minimalDistance);
      return manhattenDistances.indexOf(minimalDistance, minimalIndex + 1) ===
        -1
        ? minimalIndex
        : value;
    })
  );
  return finalManhattenMap;
};

export const largestArea = coordinates => {
  const parsedCoordinates = parseCoordinates(coordinates);
  const manhattenMap = createManhattenMap(coordinates);
  // const coordinateCandidates = getCandidateCoordinates(coordinates);
  const areaMap = parsedCoordinates.reduce(
    (prev, curr, index) => ({
      ...prev,
      [index]: 0,
    }),
    {}
  );
  let result = manhattenMap.reduce(
    (prev, yCoordinates) =>
      yCoordinates.reduce(
        (pre, value) => (value ? { ...pre, [value]: pre[value] + 1 } : pre),
        prev
      ),
    areaMap
  );

  for (let index = 0; index < manhattenMap.length; index++) {
    const column = manhattenMap[index];
    if (index === 0 || index === manhattenMap.length - 1) {
      column.forEach(element => {
        delete result[element];
      });
    } else {
      delete result[column[0]];
      delete result[column[column.length - 1]];
    }
  }
  // console.log(manhattenMap);
  return Object.values(result).reduce((prev, curr) => Math.max(prev, curr));
};

export const myInput = `357, 59
312, 283
130, 47
89, 87
87, 58
158, 169
182, 183
300, 318
82, 257
200, 194
71, 259
112, 67
82, 163
107, 302
58, 194
40, 88
288, 339
64, 245
243, 302
41, 43
147, 276
143, 116
103, 178
262, 226
253, 157
313, 71
202, 236
353, 192
96, 74
167, 50
125, 132
90, 315
174, 232
185, 237
126, 134
152, 191
104, 315
283, 90
95, 193
252, 286
48, 166
69, 75
48, 349
59, 124
334, 95
263, 134
50, 314
196, 66
342, 221
60, 217`;
