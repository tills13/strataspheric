import { useCallback, useRef } from "react";

export function useToggleScroll() {
  const scrollRef = useRef<number>(-1);

  const disableScroll = useCallback(() => {
    const scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop;

    scrollRef.current = scrollPosition;
    document.body.style.overflowY = "hidden";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";
  }, []);

  const enableScroll = useCallback(() => {
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("top");
    document.body.style.removeProperty("width");
    window.scroll({ top: scrollRef.current, behavior: "auto" });
    scrollRef.current = -1;
  }, []);

  const toggleScroll = useCallback(() => {
    if (scrollRef.current === -1) {
      enableScroll();
    } else {
      disableScroll();
    }
  }, [disableScroll, enableScroll]);

  return { enableScroll, disableScroll, toggleScroll };
}
