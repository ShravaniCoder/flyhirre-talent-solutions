import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { COMPANY, NAV_ITEMS } from "../data/siteData";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <div className="site">
      {/* =========================
          HEADER / NAVBAR
          ========================= */}
      <header className="header">
        <div className="container nav">
          {/* Logo */}
          <Link
            className="brand"
            to="/"
            onClick={closeMenu}
            aria-label="Flyhirre Home"
          >
            <img
              src="/images/flyhirre-logo1.png"
              alt="Flyhirre - Recruitment and Talent Solutions"
              className="brand-logo"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="menu-btn"
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
      <main>{children}</main>

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
    </div>
  );
}