# 🔑 typed-entries

[![npm version](https://img.shields.io/npm/v/typed-entries)](https://www.npmjs.com/package/typed-entries)
[![npm bundle size](https://img.shields.io/npm/unpacked-size/typed-entries)](https://www.npmjs.com/package/typed-entries)
[![license](https://img.shields.io/github/license/jbingen/typed-entries)](https://github.com/jbingen/typed-entries/blob/main/LICENSE)

Type-safe `Object.keys`, `Object.entries`, and `Object.fromEntries` for TypeScript.

For anyone tired of writing `Object.keys(obj) as (keyof typeof obj)[]` every time.

```
npm install typed-entries
```

```typescript
// before
const keys = Object.keys(config) as (keyof typeof config)[];
const entries = Object.entries(config) as [keyof typeof config, string][];

// after
const keys = keys(config);    // ("host" | "port")[]
const entries = entries(config); // (["host", string] | ["port", number])[]
```

Drop-in replacements. Types are inferred from the object - no manual annotations.

```typescript
import { keys, entries, fromEntries } from "typed-entries";

const config = { host: "localhost", port: 3000, debug: true };

keys(config);
// ("host" | "port" | "debug")[]

entries(config);
// (["host", string] | ["port", number] | ["debug", boolean])[]

fromEntries([["a", 1], ["b", 2]] as const);
// Record<"a" | "b", 1 | 2>
```

## Why

TypeScript deliberately widens `Object.keys()` to `string[]` and `Object.entries()` to `[string, T][]`. This is technically correct because objects can have extra properties at runtime. But in practice, when you know the shape, the widened types just create friction.

This library provides the narrowed versions as explicit opt-ins. Three functions, zero dependencies.

## API

### `keys(obj)`

Returns `(keyof T)[]` instead of `string[]`.

```typescript
keys({ a: 1, b: 2 }); // ("a" | "b")[]
```

### `entries(obj)`

Returns `[K, T[K]][]` with the key-value pairs properly associated.

```typescript
entries({ a: 1, b: "hello" }); // (["a", number] | ["b", string])[]
```

### `fromEntries(pairs)`

Returns `Record<K, V>` with the key type preserved, instead of `{ [k: string]: V }`.

```typescript
fromEntries([["x", 1], ["y", 2]] as const); // Record<"x" | "y", 1 | 2>
```

## When to use this

Use it when you have a known, closed object shape and you're iterating over it. Don't use it on objects that might have extra keys at runtime (e.g., API responses you haven't validated). The standard `Object.keys` behavior is correct for those cases.

## Design decisions

- Zero dependencies. Tiny footprint.
- Thin wrappers over `Object.keys`, `Object.entries`, `Object.fromEntries` - no runtime logic beyond the cast.
- Intentionally small scope. No deep utilities, no mapped types, no type-toolbelt expansion.
- Explicit opt-in to narrowed types, not a global override.
