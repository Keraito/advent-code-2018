const parseSingleInstruction = singleInstruction =>
  singleInstruction.match(
    /Step (\w) must be finished before step (\w) can begin./
  );

const parseInstructions = (instructions, delimiter = '\n') =>
  instructions.split(delimiter).map(parseSingleInstruction);

const createSteps = (instructions, delimiter = '\n') =>
  parseInstructions(instructions, delimiter).reduce(
    (stepsMap, [entireInstruction, requiredStep, resultingStep]) => ({
      ...stepsMap,
      [requiredStep]: stepsMap[requiredStep]
        ? [...stepsMap[requiredStep], resultingStep]
        : [resultingStep],
    }),
    {}
  );

const deriveStepOrder = (instructions, delimiter = '\n') => {
  let stepsMap = createSteps(instructions, delimiter);
  let candidates = Object.keys(stepsMap).filter(value =>
    Object.values(stepsMap).every(
      resultingSteps => !resultingSteps.includes(value)
    )
  );
  let result = '';
  while (candidates.length > 0) {
    const [lowestLetter, ...rest] = candidates
      .filter(candidate =>
        Object.values(stepsMap).every(stepMap => !stepMap.includes(candidate))
      )
      .sort();
    result += lowestLetter;
    const { [lowestLetter]: lowerLetterArray, ...otherLetters } = stepsMap;
    stepsMap = otherLetters;
    candidates = rest.concat(lowerLetterArray || []);
  }
  return result;
};

const letterToIndex = letter => letter.toLowerCase().charCodeAt(0) - 96;

const deriveTimedStepOrder = (
  instructions,
  delimiter = '\n',
  workersCount = 5,
  offset = 0
) => {
  let stepsMap = createSteps(instructions, delimiter);
  let candidates = Object.keys(stepsMap).filter(value =>
    Object.values(stepsMap).every(
      resultingSteps => !resultingSteps.includes(value)
    )
  );
  let result = '';
  let workers = new Array(workersCount).fill([[0, '']]);
  let time = 0;
  while (
    candidates.length > 0 ||
    !workers.every(([[time, _], ...rest]) => time === 0)
  ) {
    workers = workers.map(([[jobTime, jobLetter], ...workerTimeline]) => {
      if (jobTime > 1) {
        time++;
        return [
          [jobTime - 1, jobLetter],
          [jobTime, jobLetter],
          ...workerTimeline,
        ];
      } else {
        result += jobLetter; // Job is done -> Add letter to result string
        const { [jobLetter]: jobLetterArray, ...otherLetters } = stepsMap; // Remove letter contraints from stepmap
        stepsMap = otherLetters; // Reassign the new stepmap without jobLetter as it's done
        candidates = candidates.concat(jobLetterArray || []); // Append the new candidates list with the resulting steps of finished job

        const [lowestLetter, ...rest] = candidates // Find a new candidate
          .filter(candidate =>
            Object.values(stepsMap).every(
              stepMap => !stepMap.includes(candidate)
            )
          )
          .sort();

        candidates = rest;

        if (lowestLetter) {
          // If there is a new candidate available...
          time++;
          return [
            [letterToIndex(lowestLetter) + offset, lowestLetter],
            [jobTime, jobLetter],
            ...workerTimeline,
          ];
        } else {
          // Otherwise idle and hope for a job in the future...
          time++;
          return [[0, ''], [jobTime, jobLetter], ...workerTimeline];
        }
      }
    });
  }
  return workers[0].length - 2;
};

const exampleInput = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`;

describe('Day 7 Part 1:', () => {
  test('should correctly parse a single', () => {
    const singleStep = 'Step C must be finished before step A can begin.';
    const regexResult = parseSingleInstruction(singleStep);
    expect(regexResult).toContain('C');
    expect(regexResult).toContain('A');
  });

  test('should correctly parse multiple instructions', () => {
    const multipleSteps = `Step C must be finished before step A can begin.
    Step C must be finished before step F can begin.`;
    const regexResult = parseInstructions(multipleSteps);
    const step1 = regexResult[0];
    const step2 = regexResult[1];
    expect(step1[1]).toBe('C');
    expect(step1[2]).toBe('A');
    expect(step2[1]).toBe('C');
    expect(step2[2]).toBe('F');
  });

  test('should correctly make a map of all the instructions', () => {
    const result = createSteps(exampleInput);
    expect(result).toEqual({
      C: ['A', 'F'],
      A: ['B', 'D'],
      B: ['E'],
      D: ['E'],
      F: ['E'],
    });
  });
  test('should correctly derive the steps order', () => {
    expect(deriveStepOrder(exampleInput)).toBe('CABDFE');
  });

  test('should dynamically destructering work?', () => {
    const map = { A: [1, 2], B: [2, 3] };
    const key = 'A';
    const { [key]: array, ...rest } = map;
    expect(rest).toEqual({ B: [2, 3] });
    expect(array).toEqual([1, 2]);
  });

  test('should correctly derive the steps order of my input', () => {
    expect(deriveStepOrder(myInput)).toBe('LFMNJRTQVZCHIABKPXYEUGWDSO');
  });
});

describe('Day 7 Part 2', () => {
  test('should correctly map letters to index in alphabet', () => {
    expect(letterToIndex('a')).toBe(1);
    expect(letterToIndex('b')).toBe(2);
    expect(letterToIndex('z')).toBe(26);
    expect(letterToIndex('s')).toBe(19);
    expect(letterToIndex('j')).toBe(10);
  });

  test('should correctly map the times of all the steps', () => {
    expect(deriveTimedStepOrder(exampleInput, '\n', 2)).toBe(15);
  });

  test('should correctly map the times of all the steps of my input', () => {
    expect(deriveTimedStepOrder(myInput, '\n', 5, 60)).toBe(15);
  });
});

const myInput = `Step T must be finished before step P can begin.
Step Q must be finished before step W can begin.
Step N must be finished before step A can begin.
Step Z must be finished before step E can begin.
Step L must be finished before step M can begin.
Step R must be finished before step S can begin.
Step F must be finished before step V can begin.
Step C must be finished before step H can begin.
Step V must be finished before step S can begin.
Step J must be finished before step I can begin.
Step I must be finished before step S can begin.
Step A must be finished before step B can begin.
Step M must be finished before step H can begin.
Step B must be finished before step O can begin.
Step H must be finished before step D can begin.
Step K must be finished before step E can begin.
Step P must be finished before step G can begin.
Step X must be finished before step W can begin.
Step Y must be finished before step U can begin.
Step E must be finished before step U can begin.
Step U must be finished before step D can begin.
Step G must be finished before step W can begin.
Step W must be finished before step O can begin.
Step D must be finished before step O can begin.
Step S must be finished before step O can begin.
Step X must be finished before step Y can begin.
Step D must be finished before step S can begin.
Step P must be finished before step Y can begin.
Step H must be finished before step W can begin.
Step I must be finished before step P can begin.
Step J must be finished before step H can begin.
Step I must be finished before step K can begin.
Step V must be finished before step H can begin.
Step T must be finished before step Y can begin.
Step U must be finished before step W can begin.
Step J must be finished before step A can begin.
Step M must be finished before step S can begin.
Step H must be finished before step Y can begin.
Step Y must be finished before step E can begin.
Step R must be finished before step K can begin.
Step V must be finished before step I can begin.
Step G must be finished before step D can begin.
Step J must be finished before step G can begin.
Step T must be finished before step C can begin.
Step Q must be finished before step C can begin.
Step R must be finished before step D can begin.
Step H must be finished before step S can begin.
Step F must be finished before step S can begin.
Step N must be finished before step Z can begin.
Step N must be finished before step J can begin.
Step K must be finished before step P can begin.
Step Z must be finished before step S can begin.
Step K must be finished before step D can begin.
Step L must be finished before step F can begin.
Step C must be finished before step X can begin.
Step T must be finished before step X can begin.
Step F must be finished before step A can begin.
Step P must be finished before step X can begin.
Step A must be finished before step S can begin.
Step E must be finished before step D can begin.
Step I must be finished before step B can begin.
Step N must be finished before step U can begin.
Step G must be finished before step S can begin.
Step B must be finished before step Y can begin.
Step Q must be finished before step H can begin.
Step U must be finished before step G can begin.
Step R must be finished before step V can begin.
Step K must be finished before step Y can begin.
Step M must be finished before step P can begin.
Step P must be finished before step D can begin.
Step X must be finished before step S can begin.
Step P must be finished before step S can begin.
Step N must be finished before step E can begin.
Step A must be finished before step K can begin.
Step R must be finished before step B can begin.
Step R must be finished before step W can begin.
Step Z must be finished before step U can begin.
Step F must be finished before step Y can begin.
Step E must be finished before step W can begin.
Step I must be finished before step X can begin.
Step U must be finished before step S can begin.
Step I must be finished before step U can begin.
Step P must be finished before step E can begin.
Step E must be finished before step S can begin.
Step W must be finished before step S can begin.
Step F must be finished before step B can begin.
Step P must be finished before step O can begin.
Step N must be finished before step C can begin.
Step N must be finished before step I can begin.
Step C must be finished before step K can begin.
Step P must be finished before step W can begin.
Step Z must be finished before step O can begin.
Step T must be finished before step Q can begin.
Step R must be finished before step O can begin.
Step Z must be finished before step I can begin.
Step I must be finished before step A can begin.
Step F must be finished before step O can begin.
Step W must be finished before step D can begin.
Step E must be finished before step G can begin.
Step M must be finished before step D can begin.
Step Z must be finished before step C can begin.`;
