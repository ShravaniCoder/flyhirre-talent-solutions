import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";
import CTA from "../components/CTA";
import { EmployerForm, CandidateForm, ContactForm } from "../components/Forms";
import { COMPANY, INDUSTRIES, FUNCTIONS, PROCESS, SEO as SEO_DATA } from "../data/siteData";
import { Hero, IndustryCard, Solution, FunctionGrid, ProcessSection } from "./pageParts";

export function Solutions(){return <><SEO {...SEO_DATA.solutions} path="/recruitment-solutions"/><Hero title="Recruitment Solutions Built for Your Business." text="From permanent hiring to freelance talent, we offer tailored recruitment solutions to help businesses build high-performing teams." image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1800&q=90"/><section className="section cream"><div className="container"><SectionHeading eyebrow="WHAT WE DO" title="Focused recruitment support from search to selection."/><div className="feature-grid">{[["Permanent / Full-Time Recruitment","Long-term hiring across specialist, managerial and corporate positions."],["Freelance Recruitment","Flexible talent for projects, assignments and temporary requirements."],["Candidate Sourcing","Targeted sourcing to identify professionals aligned with the role."],["Screening & Shortlisting","Reviewing experience, skills, availability and agreed criteria."],["Corporate Recruitment","Recruitment across core commercial, operational and support functions."],["Specialist Recruitment","Focused searches for roles requiring specific industry or functional expertise."]].map(([t,d],i)=><div className="feature-card" key={t}><span className="number">0{i+1}</span><h3>{t}</h3><p>{d}</p></div>)}</div></div></section><CTA title="Need talent for your next requirement?" text="Share the role with our team and let's discuss how we can support your hiring journey."/></>}
