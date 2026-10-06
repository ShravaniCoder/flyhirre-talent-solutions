import React, { useRef } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { FUNCTIONS, PROCESS } from "../data/siteData";
import { scrollToId } from "../utils/scroll";

const heroImg="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=90";

export function Hero({eyebrow="RECRUITMENT & TALENT SOLUTIONS | INDIA & INTERNATIONAL", title, text, image=heroImg, children}) {
  const ref = useRef(null);
  const next = () => {
    const el = ref.current && ref.current.nextElementSibling;
    if (!el) return;
    if (!el.id) el.id = "after-hero";
    scrollToId(el.id);
  };
  return <section ref={ref} className="hero" style={{backgroundImage:`linear-gradient(90deg,rgba(7,17,31,.97) 0%,rgba(7,17,31,.82) 48%,rgba(7,17,31,.2) 100%),url(${image})`}}>
    <div className="container hero-content"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p>{children}</div>
    <button type="button" className="scroll-cue" onClick={next} aria-label="Scroll down"><i /><span>Scroll</span></button>
  </section>;
}

export function IndustryCard({title,desc,image}){return <article className="industry-card"><img src={image} alt={title}/><div><h3>{title}</h3><p>{desc}</p><Link to="/industries">Explore <span>→</span></Link></div></article>}
export function Solution({title,text,bullets,image,link}){return <article className="solution-card"><img src={image} alt="" /><div className="solution-copy"><h3>{title}</h3><p>{text}</p><ul>{bullets.map(b=><li key={b}>{b}</li>)}</ul><Link className="btn gold small" to={link}>Explore Solution →</Link></div></article>}
export function FunctionGrid(){return <div className="function-grid">{FUNCTIONS.map(([t,d],i)=><Link className="function-card" to="/corporate-functions" key={t}><span className="icon">{String(i+1).padStart(2,"0")}</span><h3>{t}</h3><p>{d}</p><span className="arrow">→</span></Link>)}</div>}
export function ProcessSection(){return <section className="section navy process"><div className="container"><SectionHeading light eyebrow="HOW WE WORK" title="Our Recruitment Process" text="A structured and transparent process designed to keep hiring focused and human."/><div className="process-grid">{PROCESS.map(([n,t,d])=><div className="process-item" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>}
