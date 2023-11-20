export function normalizeStrataNameToSubdomain(input: string): string {
  return input.replaceAll(/[ ']/g, "").toLowerCase();
}
