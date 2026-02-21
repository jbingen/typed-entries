type Entry<T> = { [K in keyof T]-?: [K, T[K]] }[keyof T];

export function keys<T extends Record<string, unknown>>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export function entries<T extends Record<string, unknown>>(obj: T): Entry<T>[] {
  return Object.entries(obj) as Entry<T>[];
}

export function fromEntries<K extends string, V>(pairs: readonly (readonly [K, V])[]): Record<K, V> {
  return Object.fromEntries(pairs) as Record<K, V>;
}
