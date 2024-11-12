export function parseMuiMediaQuery(query: string): string {
  if (query.startsWith('@media ')) {
    return query.slice('@media '.length);
  }
  return query;
}
