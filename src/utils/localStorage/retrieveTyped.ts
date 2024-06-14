export function retrieveTyped<Type>(key: string, sanitiser: (value: string | null) => Type): Type {
  const value = localStorage.getItem(key);
  return sanitiser(value);
}
