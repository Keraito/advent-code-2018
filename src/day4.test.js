import {
  parseRecord,
  getOrderedRecordEntries,
  myInput,
  guardTimesMostAsleepMinute,
} from './day4';
describe('Day 4 Part 1:', () => {
  test('should correctly parse a record', () => {
    expect(parseRecord('[1518-11-01 00:00] Guard #10 begins shift')).toEqual([
      new Date('1518-11-01 00:00'),
      'Guard #10 begins shift',
    ]);
  });
  test('should correctly order a group of records', () => {
    const groupOfRecords = `[1518-11-01 00:25] wakes up
                            [1518-11-01 00:05] falls asleep
                            [1518-11-01 00:00] Guard #10 begins shift`;
    const expectedResult = [
      [new Date('1518-11-01 00:00'), 'Guard #10 begins shift'],
      [new Date('1518-11-01 00:05'), 'falls asleep'],
      [new Date('1518-11-01 00:25'), 'wakes up'],
    ];
    expect(getOrderedRecordEntries(groupOfRecords)).toEqual(expectedResult);
  });

  test('my input should be a multiple of 3', () => {
    expect(getOrderedRecordEntries(myInput).length % 3).toBe(0);
  });

  test('should correctly do part 1 for the example', () => {
    const example = `[1518-11-01 00:00] Guard #10 begins shift
    [1518-11-01 00:05] falls asleep
    [1518-11-01 00:25] wakes up
    [1518-11-01 00:30] falls asleep
    [1518-11-01 00:55] wakes up
    [1518-11-01 23:58] Guard #99 begins shift
    [1518-11-02 00:40] falls asleep
    [1518-11-02 00:50] wakes up
    [1518-11-03 00:05] Guard #10 begins shift
    [1518-11-03 00:24] falls asleep
    [1518-11-03 00:29] wakes up
    [1518-11-04 00:02] Guard #99 begins shift
    [1518-11-04 00:36] falls asleep
    [1518-11-04 00:46] wakes up
    [1518-11-05 00:03] Guard #99 begins shift
    [1518-11-05 00:45] falls asleep
    [1518-11-05 00:55] wakes up`;
    expect(guardTimesMostAsleepMinute(example)).toBe(240);
  });

  test('should correctly do part 1 for my input', () => {
    expect(guardTimesMostAsleepMinute(myInput)).toBe(12169);
  });
});
