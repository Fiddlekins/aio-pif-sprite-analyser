export function retrieveString(key: string, defaultValue: string): string {
  const value = localStorage.getItem(key);
  if (value === null) {
    return defaultValue;
  }
  return value;
}
