import { keys, entries, fromEntries } from '../src/index';

type AssertEqual<T, U> = [T] extends [U] ? [U] extends [T] ? true : never : never;
function typeEqual<T, U>(_: AssertEqual<T, U>) {}

const obj = { a: 1, b: 'hello' } as const;

// keys infers literal union
const k = keys(obj);
typeEqual<typeof k, ('a' | 'b')[]>(true);

// entries infers [key, value] union
const e = entries(obj);
typeEqual<typeof e, (['a', 1] | ['b', 'hello'])[]>(true);

// fromEntries infers Record<K, V>
const pairs = [['x', 1], ['y', 2]] as const;
const reconstructed = fromEntries(pairs);
typeEqual<typeof reconstructed, Record<'x' | 'y', 1 | 2>>(true);

// roundtrip preserves shape
const original = { foo: 42, bar: 99 };
const roundtripped = fromEntries(entries(original));
typeEqual<typeof roundtripped, Record<'foo' | 'bar', number>>(true);

// @ts-expect-error - keys doesn't accept non-objects
keys(123);

// @ts-expect-error - entries doesn't accept non-objects
entries('hello');
