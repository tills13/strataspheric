export function getTimestamp(fd: FormData, name: string): number {
  const dateStr = getString(fd, name);

  if (!dateStr) {
    return 0;
  }

  const d = new Date(dateStr);

  if (isNaN(d.getTime())) {
    return 0;
  }

  return d.getTime() / 1000;
}

export function getString(fd: FormData, name: string): string {
  const d = fd.get(name);

  if (typeof d === "string") {
    return d;
  }

  return "";
}

export function getEnum<T>(
  fd: FormData,
  name: string,
  allowedValues: T[],
): T | undefined {
  const rawValue = getString(fd, name);

  if (!allowedValues.includes(rawValue as T)) {
    return undefined;
  }

  return rawValue as T;
}

export function getBoolean(fd: FormData, name: string): boolean {
  return getString(fd, name) === "on";
}
export function getFloat(fd: FormData, name: string): number | undefined {
  const f = parseFloat(getString(fd, name));

  if (isNaN(f)) {
    return undefined;
  }

  return f;
}

export function getInteger(fd: FormData, name: string): number {
  return parseInt(getString(fd, name), 10);
}

export function getFile(fd: FormData, name: string): File | undefined {
  const v = fd.get(name) || undefined;

  if (typeof v === "string") {
    return undefined;
  }

  return v;
}

export function getObject(fd: FormData, name: string): Record<string, unknown> {
  return [...fd.entries()]
    .filter(([key]) => key.startsWith(`${name}[`) && key.endsWith("]"))
    .reduce<Record<string, unknown>>((acc, [key, value]) => {
      acc[key.substring(name.length + 1, key.length - 1)] = value;
      return acc;
    }, {});
}
