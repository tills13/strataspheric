import { useEffect, useRef } from "react";

const DEFAULT_EVENTS = ["mousedown", "touchstart"];

export function useClickOutside<T extends HTMLElement = any>(
  handler: () => void,
  nodes?: (HTMLElement | null)[],
) {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    const listener = (event: any) => {
      const { target } = event ?? {};

      if (Array.isArray(nodes)) {
        const shouldIgnore =
          target?.hasAttribute("data-ignore-outside-clicks") ||
          (!document.body.contains(target) && target.tagName !== "HTML");
        const shouldTrigger = nodes.every(
          (node) => !!node && !event.composedPath().includes(node),
        );

        if (shouldTrigger && !shouldIgnore) {
          handler();
        }
      } else if (ref.current && !ref.current.contains(target)) {
        handler();
      }
    };

    DEFAULT_EVENTS.forEach((fn) => document.addEventListener(fn, listener));

    return () => {
      DEFAULT_EVENTS.forEach((fn) =>
        document.removeEventListener(fn, listener),
      );
    };
  }, [handler, nodes]);

  return ref;
}
