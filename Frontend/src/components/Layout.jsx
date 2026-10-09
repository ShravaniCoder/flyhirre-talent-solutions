import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { COMPANY, NAV_ITEMS } from "../data/siteData";
import ScrollManager from "./ScrollManager";
import AnimationManager from "./AnimationManager";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const { pathname } = useLocation();

  const closeMenu = () => {
    setOpen(false);
  };

  // Header state, scroll progress bar and back-to-top visibility
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        document.documentElement.style.setProperty("--progress", max > 0 ? String(y / max) : "0");
        setScrolled(y > 12);
        setShowTop(y > 600);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Lock page scroll while the mobile menu is open; close with Escape
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close the menu whenever the page changes
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <div className="site">
      <ScrollManager />
      <AnimationManager />
      <div className="scroll-progress" aria-hidden="true" />
      {/* =========================
          HEADER / NAVBAR
          ========================= */}
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav">
          {/* Logo */}
          <Link
            className="brand"
            to="/"
            onClick={closeMenu}
            aria-label="Flyhirre Home"
          >
            <img
              src="/images/FlyhirreT.png"
              alt="Flyhirre - Recruitment and Talent Solutions"
              className="brand-logo"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className={`menu-btn ${open ? "open" : ""}`}
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Navigation */}
          <nav
            className={`nav-links ${open ? "open" : ""}`}
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {label}
              </NavLink>
            ))}

            {/* Hire Talent CTA */}
            <Link
              className="nav-cta"
              to="/employers"
              onClick={closeMenu}
            >
              Hire Talent <span>→</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* =========================
          MAIN CONTENT
          ========================= */}
      <main key={pathname} className="page">{children}</main>

      {/* =========================
          FOOTER
          ========================= */}
      <footer className="footer">
        <div className="container footer-grid">

          {/* Footer Brand */}
          <div>
            <Link
              className="brand footer-brand"
              to="/"
              onClick={closeMenu}
              aria-label="Flyhirre Home"
            >
              <img
                src="/images/FlyhirreF.png"
                alt="Flyhirre - Recruitment and Talent Solutions"
                className="footer-logo"
              />
            </Link>

            <p>
              Recruitment &amp; Talent Solutions | India &amp; International
            </p>

            <p className="muted">
              We connect exceptional professionals with ambitious businesses
              through focused, people-first recruitment.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4>Explore</h4>

            <Link to="/about">About</Link>

            <Link to="/recruitment-solutions">
              Solutions
            </Link>

            <Link to="/industries">
              Industries
            </Link>

            <Link to="/corporate-functions">
              Functions
            </Link>

            <Link to="/recruitment-process">
              Process
            </Link>

            <Link to="/india-coverage">
              India Coverage
            </Link>
          </div>

          {/* Connect */}
          <div>
            <h4>Connect</h4>

            <Link to="/employers">
              Hire Talent
            </Link>

            <Link to="/candidates">
              Submit Your CV
            </Link>

            <Link to="/contact">
              Contact
            </Link>

            <a href={`mailto:${COMPANY.email}`}>
              Email Us
            </a>
          </div>

          {/* Contact */}
          <div>
            <h4>Contact</h4>

            <p>{COMPANY.location}</p>

            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
            >
              {COMPANY.phone}
            </a>

            <a href={`mailto:${COMPANY.email}`}>
              {COMPANY.email}
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} Flyhirre. All rights reserved.
          </span>

          <span>
            Privacy Policy · Terms &amp; Conditions
          </span>
        </div>
      </footer>

      <button
        type="button"
        className={`back-top ${showTop ? "show" : ""}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </div>
  );
}