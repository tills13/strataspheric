export function getString(fd: FormData, name: string): string {
  const d = fd.get(name);

  if (typeof d === "string") {
    return d;
  }

  return "";
}

export function getBoolean(fd: FormData, name: string): boolean {
  return getString(fd, name) === "on";
}

export function getInteger(fd: FormData, name: string) {
  return parseInt(getString(fd, name), 10);
}
