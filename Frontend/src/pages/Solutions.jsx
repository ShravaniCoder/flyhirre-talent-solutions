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

export function Solutions(){return <><SEO {...SEO_DATA.solutions} path="/recruitment-solutions"/><Hero title="Recruitment Solutions Built for Your Business." text="From permanent hiring to freelance talent, we offer tailored recruitment solutions to help businesses build high-performing teams." image="/images/S1.png"/><section className="section cream"><div className="container"><SectionHeading eyebrow="WHAT WE DO" title="Focused recruitment support from search to selection."/><div className="feature-grid">{[["Permanent / Full-Time Recruitment","We support long-term hiring across specialist, managerial and corporate positions."],["Freelance Recruitment","Our team provides flexible talent for projects, assignments and temporary requirements."],["Candidate Sourcing","We use targeted sourcing to identify professionals aligned with the role."],["Screening & Shortlisting","Our team reviews experience, skills, availability and agreed criteria."],["Corporate Recruitment","Flyhirre supports recruitment across core commercial, operational and support functions."],["Specialist Recruitment","We conduct focused searches for roles requiring specific industry or functional expertise."]].map(([t,d],i)=><div className="feature-card" key={t}><span className="number">0{i+1}</span><h3>{t}</h3><p>{d}</p></div>)}</div></div></section><Compare data={D.COMPARE}/><ProcessSection/><FAQ items={D.FAQS.solutions}/><CTA title="Need talent for your next requirement?" text="Share the role with our team and let's discuss how we can support your hiring journey."/></>}
