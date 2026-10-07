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

export function Process(){return <><SEO {...SEO_DATA.process} path="/recruitment-process"/><Hero title="A Transparent Process for Better Hiring Outcomes." text="Our structured recruitment process helps employers and candidates move through each stage with clarity." image="/images/Po1.png"/><section className="section cream"><div className="container"><div className="large-process">{PROCESS.map(([n,t,d])=><div key={n} className="large-process-item"><span>{n}</span><div><h2>{t}</h2><p>{d}</p></div></div>)}</div></div></section><WhyGrid eyebrow="OUR COMMITMENT" title="What you can expect at every stage." items={D.PROCESS_COMMITMENTS}/><CTA title="Ready to begin?" text="Share your requirement or submit your profile and our team will take it from there."/></>}
