export function extname(input: string): string {
  return input.split(".").filter(Boolean).pop()!;
}
