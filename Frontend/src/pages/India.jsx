import React from "react";
import SEO from "../components/SEO";
import SectionHeading from "../components/SectionHeading";
import CTA from "../components/CTA";
import { SEO as SEO_DATA } from "../data/siteData";
import * as D from "../data/siteData";
import { Hero } from "./pageParts";
import { WhyGrid, FAQ } from "../components/Extras";

const CITIES = [
  "Mumbai",
 
 
 
 
];

export function India() {
  return (
    <>
      <SEO {...SEO_DATA.india} path="/india-coverage" />

      <Hero
        title="Mumbai-Based. Serving Mumbai."
        text="We are based in Mumbai and support employers and professionals across Mumbai depending on the role and recruitment requirement."
        image="/images/Mum.png"
      />

      <section className="section cream">
        <div className="container two-col">
          <div>
            <SectionHeading
              eyebrow="Mumbai COVERAGE"
              title="Local understanding, wider reach."
              text="Our team can work with recruitment requirements across major business and employment markets in India without implying physical offices in every location."
            />
            <div className="city-list">
              {CITIES.map((city) => (
                <span key={city}>{city}</span>
              ))}
            </div>
          </div>

          <div className="map-card">
            <div className="india-map">MUMBAI</div>
            <p>
              Major markets can be supported based on the specific role,
              employer requirement and candidate availability.
            </p>
          </div>
        </div>
      </section>

      <WhyGrid
        eyebrow="HOW WE SUPPORT"
        title="One team. Many markets."
        items={D.INDIA_SUPPORT}
      />
      <FAQ tone="cream" items={D.FAQS.india} />

      <CTA
        title="Hiring across Mumbai?"
        text="Tell us where you need talent and our team will discuss the requirement."
      />
    </>
  );
}