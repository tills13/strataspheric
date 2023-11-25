export function getString(fd: FormData, name: string): string {
  const d = fd.get(name);

  if (typeof d === "string") {
    return d;
  }

  return "";
}
