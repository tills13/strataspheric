/**
 * Creates a CSS color-mix expression that mixes a color with transparent.
 * Shorthand for `color-mix(in srgb, <color> <percentage>%, transparent)`.
 */
export function colorMix(color: string, percentage: number): string {
  return `color-mix(in srgb, ${color} ${percentage}%, transparent)`;
}
