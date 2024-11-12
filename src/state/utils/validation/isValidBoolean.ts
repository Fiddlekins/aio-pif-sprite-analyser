export function isValidBoolean() {
  return (value: unknown): boolean => {
    if (typeof value === 'boolean') {
      return true;
    }
    return false;
  }
}
