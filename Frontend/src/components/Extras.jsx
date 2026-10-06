import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import SectionHeading from "./SectionHeading";

/* ---------- Icons (inline SVG, no dependencies) ---------- */
const PATHS = {
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z M9 12l2 2 4-4",
  users: "M16 11a3 3 0 100-6 3 3 0 000 6z M8 12a3 3 0 100-6 3 3 0 000 6z M2 20c0-3 3-5 6-5s6 2 6 5 M14 15c3 0 8 1 8 5",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18z M12 7v5l3 2",
  globe: "M12 21a9 9 0 100-18 9 9 0 000 18z M3 12h18 M12 3c3 3 3 15 0 18 M12 3c-3 3-3 15 0 18",
  target: "M12 21a9 9 0 100-18 9 9 0 000 18z M12 16a4 4 0 100-8 4 4 0 000 8z M12 12h.01",
  chat: "M4 5h16v11H9l-5 4V5z",
  heart: "M12 20s-8-5-8-11a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 9c0 6-8 11-8 11z",
  file: "M6 3h8l4 4v14H6V3z M14 3v4h4 M9 12h6 M9 16h6",
  briefcase: "M3 8h18v12H3V8z M9 8V5h6v3 M3 13h18",
  star: "M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z",
};

export function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(PATHS[name] || PATHS.star).split(" M").map((d, i) => <path key={i} d={(i ? "M" : "") + d} />)}
    </svg>
  );
}

/* ---------- Animated counter ---------- */
function Counter({ end, suffix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) { setVal(end); return; }
    let raf;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1400;
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        setVal(Math.round(end * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [end]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ---------- Stats ---------- */
export function StatsBand({ items, overlap = false }) {
  return (
    <div className={`stats-wrap ${overlap ? "overlap" : ""}`}>
      <div className="container">
        <div className="stats-card">
          {items.map((s) => (
            <div className="stat" key={s.label}>
              <strong><Counter end={s.value} suffix={s.suffix} /></strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Scrolling strip ---------- */
export function Marquee({ items }) {
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}

/* ---------- Feature cards with icons ---------- */
export function WhyGrid({ eyebrow, title, text, items, light = false, tone = "ivory" }) {
  return (
    <section className={`section ${tone}`}>
      <div className="container">
        <SectionHeading light={light} eyebrow={eyebrow} title={title} text={text} />
        <div className="why-grid">
          {items.map((x) => (
            <div className={`why-card ${light ? "light" : ""}`} key={x.title}>
              <span className="why-icon"><Icon name={x.icon} /></span>
              <h3>{x.title}</h3>
              <p>{x.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Mission / Vision ---------- */
export function MissionVision({ items }) {
  return (
    <section className="section ivory">
      <div className="container">
        <div className="mv-grid">
          {items.map((x) => (
            <div className="mv-card" key={x.title}>
              <span className="why-icon"><Icon name={x.icon} /></span>
              <h3>{x.title}</h3>
              <p>{x.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ accordion (with SEO schema) ---------- */
export function FAQ({ items, eyebrow = "GOOD TO KNOW", title = "Frequently Asked Questions", text, tone = "ivory" }) {
  const [open, setOpen] = useState(0);
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
  return (
    <section className={`section ${tone}`}>
      <Helmet><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
      <div className="container faq-wrap">
        <SectionHeading eyebrow={eyebrow} title={title} text={text} />
        <div className="faq-list">
          {items.map(([q, a], i) => (
            <div className={`faq-item ${open === i ? "open" : ""}`} key={q}>
              <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{q}</span>
                <i aria-hidden="true" />
              </button>
              <div className="faq-a"><div><p>{a}</p></div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Permanent vs Freelance table ---------- */
export function Compare({ data }) {
  return (
    <section className="section ivory">
      <div className="container">
        <SectionHeading eyebrow="CHOOSE YOUR MODEL" title="Permanent or freelance? Here is how they compare." text="Both models come with the same careful sourcing and screening. The right choice depends on your goals." />
        <div className="compare" role="table">
          <div className="compare-row head" role="row">
            <span role="columnheader" />
            {data.columns.map((c) => <strong role="columnheader" key={c}>{c}</strong>)}
          </div>
          {data.rows.map(([k, a, b]) => (
            <div className="compare-row" role="row" key={k}>
              <span role="rowheader">{k}</span>
              <p role="cell" data-label={data.columns[0]}>{a}</p>
              <p role="cell" data-label={data.columns[1]}>{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Roles by industry ---------- */
export function RolesGrid({ items }) {
  return (
    <section className="section navy">
      <div className="container">
        <SectionHeading light eyebrow="ROLES WE RECRUIT" title="The kinds of roles we help fill." text="A snapshot of positions our team regularly supports. If your role is not listed, talk to us." />
        <div className="roles-grid">
          {items.map((x) => (
            <div className="roles-card" key={x.industry}>
              <h3>{x.industry}</h3>
              <ul>{x.roles.map((r) => <li key={r}>{r}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- What happens next ---------- */
export function NextSteps({ items }) {
  return (
    <section className="section navy">
      <div className="container">
        <SectionHeading light eyebrow="WHAT HAPPENS NEXT" title="From your message to a conversation." />
        <div className="next-steps">
          {items.map((s) => (
            <div className="next-step" key={s.n}>
              <span>{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
