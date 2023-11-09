export function classnames(
  ...mClassNames: Array<string | undefined | boolean | Record<string, boolean>>
): string {
  return mClassNames
    .flatMap((c) => {
      if (typeof c === "string") {
        return c;
      }

      // c could be `true` literal here but including that would likely be an error
      if (typeof c === "boolean" || c === undefined) {
        return [];
      }

      return Object.entries(c)
        .filter(([, predicate]) => !!predicate)
        .map(([className]) => className);
    })
    .join(" ");
}
