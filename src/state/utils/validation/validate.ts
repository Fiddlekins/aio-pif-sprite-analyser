export function validate(obj: Record<string, unknown> | undefined, key: string, predicate: (value: unknown) => boolean) {
  if (obj && !predicate(obj[key])) {
    delete obj[key];
  }
}
