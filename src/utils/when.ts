export function when<T, R>(value: T, clauses: [T, () => R][], fallback: () => R): R {
  for(const clause of clauses) {
    if(value === clause[0]) return clause[1]();
  }
  return fallback();
}
