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

export function Candidates(){return <><SEO {...SEO_DATA.candidates} path="/candidates"/><Hero title="Your Next Opportunity Starts Here." text="Explore meaningful career opportunities across travel, hospitality, aviation, events, PR, communications and corporate functions." image="/images/C1.png"><div className="actions"><Link className="btn gold" to="/candidates#submit">Submit Your CV →</Link><a className="btn whatsapp" href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noreferrer">Submit CV via WhatsApp</a></div></Hero><section className="section cream"><div className="container"><SectionHeading eyebrow="YOUR JOURNEY" title="A simple path from profile to opportunity."/><div className="candidate-steps">{["Submit","Review","Match","Connect","Interview","Opportunity"].map((x,i)=><div key={x}><span>0{i+1}</span><h3>{x}</h3><p>{["Share your CV and professional information.","Our team reviews your profile.","Your profile may be considered for relevant requirements.","We contact you when there is a suitable opportunity.","You connect with the employer where appropriate.","The employer makes the final selection."][i]}</p></div>)}</div></div></section><section id="submit" className="section navy"><div className="container form-layout"><div><SectionHeading light eyebrow="SUBMIT YOUR CV" title="Let our team know where you want to go next." text="Complete the form and share your CV. We will keep your information within our recruitment process and review it for relevant opportunities."/><p className="muted">We do not publish candidate profiles as a public directory.</p></div><div className="form-card"><CandidateForm/></div></div></section><WhyGrid eyebrow="MAKE YOUR PROFILE COUNT" title="Simple ways to stand out." items={D.CANDIDATE_TIPS}/><FAQ tone="cream" items={D.FAQS.candidates} title="Candidate questions, answered."/></>}
