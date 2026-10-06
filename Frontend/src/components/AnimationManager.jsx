import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Adds scroll-reveal animation to existing page elements automatically,
 * so no page markup has to be changed. Runs again on every route change.
 */
const UP = [
  ".section-heading", ".quote-card", ".map-card", ".form-card", ".check-list", ".split-panel > div",
  ".cta-inner > *", ".faq-list", ".compare", ".stats-card", ".mv-card", ".note-card",
];
const STAGGER = [
  ".industry-grid > *", ".function-grid > *", ".process-grid > *", ".values-grid > *",
  ".feature-grid > *", ".candidate-steps > *", ".large-process > *", ".city-list > *",
  ".industry-list > *", ".solution-grid > *", ".contact-list > *", ".why-grid > *",
  ".roles-grid > *", ".next-steps > *", ".mv-grid > *",
];

export default function AnimationManager() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    const targets = new Set();
    const prep = (el, delay = 0, kind = "up") => {
      if (targets.has(el) || el.closest(".hero")) return;
      el.classList.add("reveal");
      el.dataset.reveal = kind;
      el.style.setProperty("--d", `${delay}ms`);
      targets.add(el);
    };

    UP.forEach((sel) => document.querySelectorAll(`main ${sel}`).forEach((el) => prep(el)));
    STAGGER.forEach((sel) => {
      document.querySelectorAll(`main ${sel}`).forEach((el, i) => prep(el, (i % 6) * 90));
    });
    document.querySelectorAll("main .two-col > *, main .form-layout > *, main .contact-grid > *").forEach((el, i) => {
      prep(el, 0, i % 2 === 0 ? "left" : "right");
    });
    document.querySelectorAll("main .industry-row > img").forEach((el) => prep(el, 0, "zoom"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add("in");
          io.unobserve(el);
          // Hand the element back to its normal hover transitions afterwards.
          const d = parseInt(el.style.getPropertyValue("--d")) || 0;
          setTimeout(() => {
            el.classList.remove("reveal", "in");
            el.removeAttribute("data-reveal");
            el.style.removeProperty("--d");
          }, 1100 + d);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    targets.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      targets.forEach((el) => el.classList.remove("reveal", "in"));
    };
  }, [pathname]);

  return null;
}
