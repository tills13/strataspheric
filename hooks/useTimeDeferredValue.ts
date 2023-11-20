import { useLayoutEffect, useState } from "react";

export function useTimeDeferredValue(input: string): string {
  const [currentValue, setCurrentValue] = useState(input);

  useLayoutEffect(() => {
    let timeout: any = setTimeout(() => {
      setCurrentValue(input);
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  });

  return currentValue;
}
