import React from "react";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";
import { ContactForm } from "../components/Forms";
import { COMPANY, SEO as SEO_DATA } from "../data/siteData";
import { Hero } from "./pageParts";
import { NextSteps, FAQ } from "../components/Extras";
import * as D from "../data/siteData";

export function Contact(){return <><SEO {...SEO_DATA.contact} path="/contact"/><Hero title="Let's Start a Conversation." text="Whether you are an employer looking for talent or a professional exploring your next opportunity, our team is ready to hear from you." image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=90"/><section className="section cream"><div className="container contact-grid"><div><SectionHeading eyebrow="CONTACT FLYHIRRE" title="We're here to help businesses and professionals." text="Have a recruitment requirement, career question or general enquiry? Send our team a message and we'll get back to you."/><div className="contact-list"><a href={`mailto:${COMPANY.email}`}><span>✉</span><div><strong>Email</strong><small>{COMPANY.email}</small></div></a><a href={`tel:${COMPANY.phone.replace(/\s/g,"")}`}><span>◉</span><div><strong>Phone</strong><small>{COMPANY.phone}</small></div></a><a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noreferrer"><span>◌</span><div><strong>WhatsApp</strong><small>Chat with our team</small></div></a><div><span>⌖</span><div><strong>Our Location</strong><small>{COMPANY.location}</small></div></div></div></div><div className="form-card"><div className="form-card-heading"><span className="eyebrow">CONTACT ENQUIRY</span><h2>Tell us how we can help.</h2><p>Your enquiry will be securely sent to our recruitment team and will appear in the Flyhirre Admin Dashboard.</p></div><ContactForm/></div></div></section><NextSteps items={D.NEXT_STEPS}/><FAQ items={D.FAQS.contact}/></>}
