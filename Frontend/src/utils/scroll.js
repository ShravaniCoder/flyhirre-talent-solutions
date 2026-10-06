// Smooth-scroll to an element id, accounting for the fixed header.
export function scrollToId(id, behavior = "smooth") {
  const el = document.getElementById(id);
  if (!el) return false;
  const header = document.querySelector(".header");
  const offset = (header ? header.offsetHeight : 76) + 8;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(top, 0), left: 0, behavior });
  return true;
}

export function scrollToTopInstant() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}
