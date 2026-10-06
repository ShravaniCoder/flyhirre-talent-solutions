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

export function Functions(){return <><SEO {...SEO_DATA.functions} path="/corporate-functions"/><Hero title="Expertise Across Every Business Function." text="We connect businesses with professionals across the functions that keep organisations moving, growing and serving customers." image="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=90"/><section className="section cream"><div className="container"><FunctionGrid/></div></section><WhyGrid eyebrow="HOW WE MATCH" title="Matching skills to the function, not just the title." items={D.WHY_US.slice(2,5)}/><ProcessSection/><CTA title="Tell us which function you are hiring for." text="Share your requirement and our team will help you navigate the next step."/></>}
