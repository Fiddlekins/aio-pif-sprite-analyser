export function retrieveBoolean(key: string, defaultValue: boolean): boolean {
  const value = localStorage.getItem(key);
  if (value === null) {
    return defaultValue;
  }
  return value === 'true';
}
