import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(customBreakpoint?: number) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  const MOBILE_BREAKPOINT_CUSTOM = customBreakpoint || MOBILE_BREAKPOINT;

  React.useEffect(() => {
    const mql = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT_CUSTOM - 1}px)`
    );
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT_CUSTOM);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT_CUSTOM);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
