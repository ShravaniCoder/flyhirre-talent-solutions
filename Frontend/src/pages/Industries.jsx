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

export function Industries(){return <><SEO {...SEO_DATA.industries} path="/industries"/><Hero title="Talent for Industries That Move People." text="We focus on industries where service, communication, operations and people create meaningful business value." image="/images/Indu.png"/><section className="section cream"><div className="container"><div className="industry-list">{INDUSTRIES.map((x,i)=><article className="industry-row" key={x.title}><img src={x.image} alt={x.title}/><div><span className="number">0{i+1}</span><h2>{x.title}</h2><p>{x.desc}</p><Link className="text-link" to="/employers">Discuss Hiring →</Link></div></article>)}</div></div></section><RolesGrid items={D.INDUSTRY_ROLES}/><WhyGrid eyebrow="INDUSTRY KNOWLEDGE" title="Why specialism matters in recruitment." items={D.WHY_US.slice(0,3)}/><CTA title="Looking for industry-specific talent?" text="Our team can discuss your role, function and hiring requirement."/></>}
