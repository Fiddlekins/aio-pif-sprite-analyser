type SanitiserFunction<Type> = (value: string | null) => Type;

export function retrieveTyped<Type>(key: string, sanitiser: SanitiserFunction<Type>): Type {
  const value = localStorage.getItem(key);
  return sanitiser(value);
}
