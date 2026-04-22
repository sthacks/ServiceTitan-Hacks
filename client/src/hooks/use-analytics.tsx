import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { trackPageView } from "@/lib/analytics";

// Meta Pixel PageView is handled entirely by GTM.
// This hook only fires Google Analytics page views on SPA route changes.
export const useAnalytics = () => {
  const [location] = useLocation();
  const prevLocationRef = useRef<string>(location);

  useEffect(() => {
    if (location !== prevLocationRef.current) {
      trackPageView(location);
      prevLocationRef.current = location;
    }
  }, [location]);
};
