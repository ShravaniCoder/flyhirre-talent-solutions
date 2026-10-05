import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";
import CTA from "../components/CTA";
import { EmployerForm, CandidateForm, ContactForm } from "../components/Forms";
import { COMPANY, INDUSTRIES, FUNCTIONS, PROCESS, SEO as SEO_DATA } from "../data/siteData";
import { Hero, IndustryCard, Solution, FunctionGrid, ProcessSection } from "./pageParts";

export function India(){return <><SEO {...SEO_DATA.india} path="/india-coverage"/><Hero title="Mumbai-Based. Serving Across India." text="We are based in Mumbai and support employers and professionals across India, depending on the role and recruitment requirement." image="https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=1800&q=90"/><section className="section cream"><div className="container two-col"><div><SectionHeading eyebrow="INDIA COVERAGE" title="Local understanding, wider reach." text="Our team can work with recruitment requirements across major business and employment markets in India without implying physical offices in every location."/><div className="city-list">{["Mumbai","Delhi NCR","Bengaluru","Hyderabad","Pune","Chennai","Kolkata","Ahmedabad"].map(x=><span key={x}>{x}</span>)}</div></div><div className="map-card"><div className="india-map">INDIA</div><p>Major markets can be supported based on the specific role, employer requirement and candidate availability.</p></div></div></section><CTA title="Hiring across India?" text="Tell us where you need talent and our team will discuss the requirement."/></>}
