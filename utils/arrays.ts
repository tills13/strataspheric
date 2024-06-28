export function* range(len: number) {
  for (let i = 0; i < len; i++) {
    yield i + 1;
  }
}
