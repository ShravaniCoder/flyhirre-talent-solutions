import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { COMPANY, NAV_ITEMS } from "../data/siteData";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="site">
      <header className="header">
        <div className="container nav">
          <Link className="brand" to="/" onClick={() => setOpen(false)}>
            <img
              src="/images/flyhirre-logo1.png"
              alt="Flyhirre - Recruitment and Talent Solutions"
              className="brand-logo"
            />
          </Link>
          <button
            className="menu-btn"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className={`nav-links ${open ? "open" : ""}`}>
            {NAV_ITEMS.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {label}
              </NavLink>
            ))}
            <Link
              className="nav-cta"
              to="/employers"
              onClick={() => setOpen(false)}
            >
              Hire Talent <span>→</span>
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <Link className="brand footer-brand" to="/">
              <span className="brand-main">NEXORA</span>
              <span className="brand-sub">TALENT SOLUTIONS</span>
            </Link>
            <p>Recruitment & Talent Solutions | India & International</p>
            <p className="muted">
              We connect exceptional professionals with ambitious businesses
              through focused, people-first recruitment.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <Link to="/about">About</Link>
            <Link to="/recruitment-solutions">Solutions</Link>
            <Link to="/industries">Industries</Link>
            <Link to="/corporate-functions">Functions</Link>
          </div>
          <div>
            <h4>Connect</h4>
            <Link to="/employers">Hire Talent</Link>
            <Link to="/candidates">Submit Your CV</Link>
            <Link to="/contact">Contact</Link>
            <a href={`mailto:${COMPANY.email}`}>Email Us</a>
          </div>
          <div>
            <h4>Contact</h4>
            <p>{COMPANY.location}</p>
            <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>
              {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} NEXORA Talent Solutions. All rights
            reserved.
          </span>
          <span>Privacy Policy · Terms & Conditions</span>
        </div>
      </footer>
    </div>
  );
}
