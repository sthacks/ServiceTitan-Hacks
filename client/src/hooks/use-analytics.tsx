import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { trackPageView } from "@/lib/analytics";
import { trackPixelPageView } from "@/lib/pixel";

export const useAnalytics = () => {
  const [location] = useLocation();
  const prevLocationRef = useRef<string>(location);

  useEffect(() => {
    if (location !== prevLocationRef.current) {
      trackPageView(location);
      trackPixelPageView();
      prevLocationRef.current = location;
    }
  }, [location]);
};
