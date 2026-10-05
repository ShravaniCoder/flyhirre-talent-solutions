import React from "react";
import { Link } from "react-router-dom";
export default function CTA({ title, text, primary = "Hire Talent", secondary = "Submit Your CV" }) {
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div><span className="eyebrow">LET'S CONNECT</span><h2>{title}</h2><p>{text}</p></div>
        <div className="cta-actions"><Link className="btn gold" to="/employers">{primary} <span>→</span></Link><Link className="btn outline" to="/candidates">{secondary} <span>→</span></Link></div>
      </div>
    </section>
  );
}
