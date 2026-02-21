import { describe, test, expect } from 'bun:test';
import { keys, entries, fromEntries } from '../src/index';

const obj = { a: 1, b: 'hello', c: true } as const;

describe('keys', () => {
  test('returns all keys', () => {
    expect(keys(obj)).toEqual(['a', 'b', 'c']);
  });

  test('empty object returns empty array', () => {
    expect(keys({})).toEqual([]);
  });
});

describe('entries', () => {
  test('returns typed entries', () => {
    const result = entries(obj);
    expect(result).toEqual([['a', 1], ['b', 'hello'], ['c', true]]);
  });

  test('empty object returns empty array', () => {
    expect(entries({})).toEqual([]);
  });
});

describe('fromEntries', () => {
  test('reconstructs object from entries', () => {
    const pairs = [['a', 1], ['b', 2]] as const;
    expect(fromEntries(pairs)).toEqual({ a: 1, b: 2 });
  });

  test('roundtrips with entries', () => {
    const original = { x: 10, y: 20 };
    const result = fromEntries(entries(original));
    expect(result).toEqual(original);
  });
});
