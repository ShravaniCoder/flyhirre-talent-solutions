import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";
import CTA from "../components/CTA";
import { EmployerForm, CandidateForm, ContactForm } from "../components/Forms";
import { COMPANY, INDUSTRIES, FUNCTIONS, PROCESS, SEO as SEO_DATA } from "../data/siteData";
import { Hero, IndustryCard, Solution, FunctionGrid, ProcessSection } from "./pageParts";
import { StatsBand, Marquee, WhyGrid, MissionVision, FAQ, Compare, RolesGrid, NextSteps } from "../components/Extras";
import ScrollLink from "../components/ScrollLink";
import * as D from "../data/siteData";
import Office from "/images/Office.png"
import Free from "/images/Free1.png"

export function Home(){
 return <><SEO {...SEO_DATA.home}/><Hero title="Connecting Exceptional Talent with Ambitious Businesses." text="We connect businesses with talented professionals through focused recruitment solutions across Travel & Tourism, Hospitality, Aviation, Events, PR and Corporate Communications.">
   <div className="actions"><Link className="btn gold" to="/employers">Hire Talent <span>→</span></Link><Link className="btn outline" to="/candidates">Explore Opportunities <span>→</span></Link></div>
   <div className="hero-pills"><span>◉ Permanent Recruitment</span><span>◉ Freelance Recruitment</span><span>◉ India </span></div>
 </Hero>
 <StatsBand overlap items={D.STATS}/>
 <section className="section cream"><div className="container"><SectionHeading eyebrow="SPECIALIST INDUSTRIES" title="Talent Across High-Impact Industries" text="Our team understands the people and functions behind service-led, communication-driven industries."/><div className="industry-grid">{INDUSTRIES.map(x=><IndustryCard key={x.title} {...x}/>)}</div></div></section>
 <section className="section navy"><div className="container"><SectionHeading light eyebrow="OUR SOLUTIONS" title="Recruitment & Talent Solutions" text="Flexible and future-ready hiring support from Flyhirre for today's changing business needs."/><div className="solution-grid"><Solution title="Permanent Recruitment" text="Building long-term teams with relevant talent, expertise and cultural alignment through our team at Flyhirre." bullets={["Executive & Management Hiring","Mid-Level Professionals","Specialist Recruitment","Corporate Functions"]} image={Office} link="/recruitment-solutions"/><Solution title="Freelance Recruitment" text="Flexible access to skilled professionals through our team at Flyhirre for projects, assignments and evolving requirements." bullets={["Contract Professionals","Project-Based Specialists","Temporary Assignments","Short-Term Requirements"]} image={Free} link="/recruitment-solutions"/></div></div></section>
 <section className="section cream"><div className="container"><SectionHeading eyebrow="FUNCTIONAL EXPERTISE" title="Expertise Across Every Business Function" text="We connect businesses with professionals across the functions that keep organisations moving."/><FunctionGrid/></div></section>
 <WhyGrid eyebrow="WHY FLYHIRRE" title="A recruitment partner that listens first." text="What you can expect when you work with our team." items={D.WHY_US}/>
 <ProcessSection/>
 <Marquee items={[...INDUSTRIES.map(x=>x.title),...FUNCTIONS.map(x=>x[0])]}/>
 <section className="split-cta"><div className="split-panel image-panel" style={{backgroundImage:`url(/images/SpaceO.png)`}}><div><span className="eyebrow">FOR EMPLOYERS</span><h2>Looking for the Right Talent?</h2><p>Tell us what you are looking for and our recruitment team will help identify relevant professionals.</p><Link className="btn gold" to="/employers">Hire Talent →</Link></div></div><div className="split-panel light-panel"><span className="eyebrow">FOR CANDIDATES</span><h2>Your Next Opportunity Starts Here.</h2><p>Share your profile with our team and explore relevant permanent and freelance opportunities.</p><div className="actions"><Link className="btn gold" to="/candidates">Submit Your CV →</Link><a className="btn whatsapp" href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp Us</a></div></div></section>
 <FAQ items={D.FAQS.home}/>
 <CTA title="Let's Start a Conversation." text="Whether you are hiring or exploring your next opportunity, our team is ready to connect."/>
 </>;
}
