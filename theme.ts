import { calc } from "@vanilla-extract/css-utils";

export function invertBreakpoint(rawBreakpoint: string) {
  const match = /\((min|max)-width: (\d+)px\)/.exec(rawBreakpoint);

  if (match) {
    const [, direction, breakpoint] = match;

    if (direction === "min") {
      const px = parseInt(breakpoint, 10) - 1;
      return `(max-width: ${px}px)`;
    }
  }

  throw new Error("invalid breakpoint: " + rawBreakpoint);
}

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

/**
 * CSS variable name for the header offset used in scroll-driven animations.
 * This variable animates from GLOBAL_HEADER_HEIGHT_PX to 0 as the user scrolls,
 * allowing sticky elements to adjust their height/position accordingly.
 */
export const HEADER_OFFSET_VAR = "--header-offset";

/**
 * The header offset CSS variable formatted for use in CSS values.
 * Use this when you need to reference the variable in calc() or other CSS functions.
 *
 * @example
 * height: calc("100vh").subtract(headerOffsetVarRef).toString()
 */
export const headerOffsetVarRef = `var(${HEADER_OFFSET_VAR})`;

/**
 * Helper to calculate a value minus the header offset.
 * Useful for sticky elements that need to account for the disappearing header.
 *
 * @example
 * height: calcMinusHeaderOffset("100vh")
 * // Returns: "calc(100vh - var(--header-offset))"
 */
export function calcMinusHeaderOffset(value: string): string {
  return calc(value).subtract(headerOffsetVarRef).toString();
}
