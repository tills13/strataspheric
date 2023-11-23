export function truncate(input: string, length: number): string {
  const s = input.substring(0, length);

  if (s !== input) {
    return s + "...";
  }

  return s;
}
