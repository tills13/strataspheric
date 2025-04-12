export function intParam(sp: URLSearchParams, paramName: string): number {
  const value: unknown = sp.get(paramName);

  if (typeof value !== "string") {
    throw new Error(`invalid integer param ${paramName}, got ${value}`);
  }

  const intValue = parseInt(value, 10);

  if (isNaN(intValue)) {
    throw new Error(`invalid integer param ${paramName}, got ${value}`);
  }

  return intValue;
}
