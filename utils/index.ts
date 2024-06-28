export function sleep(t: number) {
  return new Promise((r) => setTimeout(r, t));
}
