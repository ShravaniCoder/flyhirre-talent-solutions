import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToId, scrollToTopInstant } from "../utils/scroll";

/**
 * - Every time a new page opens, the scrollbar goes back to the top.
 * - If the URL has a #hash (e.g. /candidates#submit) it scrolls to that section instead.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  useLayoutEffect(() => {
    if (hash) return;
    scrollToTopInstant();
  }, [pathname, hash]);

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const t = setTimeout(() => scrollToId(id), 120);
    return () => clearTimeout(t);
  }, [pathname, hash]);

  return null;
}
