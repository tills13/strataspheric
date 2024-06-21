// import "@vanilla-extract/css";

export function important<T>(value: T): T {
  return `${value} !important` as T;
}

export function border(width: string, style: string, color: string): string {
  return `${width} ${style} ${color}`;
}

export function padding(
  vertical: string | number,
  horizontal: string | number,
): string;
export function padding(
  top: string | number,
  right: string | number,
  bottom: string | number,
  left: string | number,
): string;

export function padding(
  ...args:
    | [string | number, string | number]
    | [string | number, string | number, string | number, string | number]
): string {
  if (args.length === 2) {
    const [vertical, horizontal] = args;

    return `${vertical} ${horizontal}`;
  }

  const [top, right, bottom, left] = args;

  return `${top} ${right} ${bottom} ${left}`;
}

export function variable(input: string): string {
  return input.substring(4, input.length - 1);
}
