import { useEffect, useState } from "react";

export function useIsAfterHydration() {
  const [isAfterHydration, setIsAfterHydration] = useState(false);
  useEffect(() => setIsAfterHydration(true), []);
  return isAfterHydration;
}
