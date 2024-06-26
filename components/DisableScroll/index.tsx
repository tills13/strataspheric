import { useEffect } from "react";

import { useToggleScroll } from "../../hooks/useToggleScroll";

export function DisableScroll() {
  const { enableScroll, disableScroll } = useToggleScroll();

  useEffect(() => {
    disableScroll();
    return enableScroll;
  }, [disableScroll, enableScroll]);

  return null;
}
