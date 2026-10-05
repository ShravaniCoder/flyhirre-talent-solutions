import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";
import CTA from "../components/CTA";
import { EmployerForm, CandidateForm, ContactForm } from "../components/Forms";
import { COMPANY, INDUSTRIES, FUNCTIONS, PROCESS, SEO as SEO_DATA } from "../data/siteData";
import { Hero, IndustryCard, Solution, FunctionGrid, ProcessSection } from "./pageParts";

export function Process(){return <><SEO {...SEO_DATA.process} path="/recruitment-process"/><Hero title="A Transparent Process for Better Hiring Outcomes." text="Our structured recruitment process helps employers and candidates move through each stage with clarity." image="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=90"/><section className="section cream"><div className="container"><div className="large-process">{PROCESS.map(([n,t,d])=><div key={n} className="large-process-item"><span>{n}</span><div><h2>{t}</h2><p>{d}</p></div></div>)}</div></div></section><CTA title="Ready to begin?" text="Share your requirement or submit your profile and our team will take it from there."/></>}
