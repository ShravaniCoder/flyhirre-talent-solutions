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

export function Employers(){return <><SEO {...SEO_DATA.employers} path="/employers"/><Hero title="The Right Talent Can Change the Trajectory of a Business." text="Partner with our team to find skilled, relevant and future-ready professionals for your organisation." image="/images/E1.png"/><section className="section cream"><div className="container form-layout"><div><SectionHeading eyebrow="HIRE TALENT" title="Tell us what you are looking for." text="Share the role, experience, function and timeline. Our recruitment team will review your requirement and connect with you."/><div className="check-list">{["Talent Sourcing","Industry Expertise","Screening & Shortlisting","Permanent & Freelance Hiring","Interview Coordination","Dedicated Recruitment Support"].map(x=><span key={x}>✓ {x}</span>)}</div></div><div className="form-card"><EmployerForm/></div></div></section><WhyGrid eyebrow="WHY PARTNER WITH US" title="Hiring support that feels like part of your team." items={D.EMPLOYER_BENEFITS}/><ProcessSection/><FAQ items={D.FAQS.employers} title="Employer questions, answered."/><section className="section navy"><div className="container centered"><SectionHeading light eyebrow="DIRECT CONNECTION" title="Prefer WhatsApp?" text="Send our team a quick message and tell us what you are hiring for."/><a className="btn whatsapp" href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noreferrer">Chat With Our Team on WhatsApp</a></div></section></>}
