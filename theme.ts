import "@vanilla-extract/css";

export function important(value: string): string {
  return `${value} !important`;
}

export function border(width: string, style: string, color: string): string {
  return `${width} ${style} ${color}`;
}

export function padding(vertical: string, horizontal: string): string;
export function padding(
  top: string,
  right: string,
  bottom: string,
  left: string,
): string;

export function padding(
  ...args: [string, string] | [string, string, string, string]
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
