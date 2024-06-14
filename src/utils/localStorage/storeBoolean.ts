export function storeBoolean(key: string, value: boolean): void {
  localStorage.setItem(key, value ? 'true' : 'false');
}
