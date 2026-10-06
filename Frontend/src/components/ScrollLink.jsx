import React from "react";
import { scrollToId } from "../utils/scroll";

/** A button-link that smoothly scrolls to a section on the same page. */
export default function ScrollLink({ to, className = "", children, ...rest }) {
  const onClick = (e) => {
    e.preventDefault();
    scrollToId(to);
    if (window.history?.replaceState) window.history.replaceState(null, "", `#${to}`);
  };
  return (
    <a href={`#${to}`} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
