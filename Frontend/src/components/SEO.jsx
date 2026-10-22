
import React from "react";
import { Helmet } from "react-helmet-async";
import { COMPANY } from "../data/siteData";

const PAGE_KEYWORDS = {
  "/": [
    "Flyhirre",
    "Flyhirre recruitment",
    "job vacancy near me",
    "human resource organisation",
    "recruitment industry in mumbai",
    "acquisition and placement",
    "Executive recruitment",
    "freelance recruitment",
    "top management",
    "placement consultant",
    "hr services",
    "professional recruitment services",
    "placement industry",
    "top recruitment agencies",
    "hr consultants",
    "recruitment firms",
    "job consultancy in Mumbai",
    "job placement consultant",
    "top placement consultants",
    "best placement conultant in mumbai",
    "recruitment agency in Mumbai",
    "HR consulting firm",
    "recruitment and talent acquisition"


  ],

  "/about": [
    "about Flyhirre",
    "Talent acquisition company in Mumbai",
    "Recruitment solutions for businesses",
    "Staffing agency in Mumbai",
    "Staffing solutions in Mumbai",
    "Manpower consultancy in Mumbai",
    "Permanent staffing services",
    "Bulk hiring services",
    "talent solutions company in Mumbai",
    "Talent acquisition services",
    "HR consulting services in Mumbai",
    "Executive search firms in Mumbai",
    "IT recruitment agency in Mumbai",
    "Recruitment process outsourcing services"
  ],

  "/recruitment-solutions": [
    "recruitment solutions",
    "permanent recruitment services",
    "freelance recruitment services",
    "talent acquisition solutions",
    "employee recruitment services",
    "professional hiring services",
    "contract staffing solutions",
    "candidate sourcing and screening",
  ],

  "/industries": [
    "industry-specific recruitment",
    "travel and tourism recruitment",
    "hospitality recruitment",
    "aviation recruitment",
    "events recruitment",
    "public relations recruitment",
    "corporate communications recruitment",
    "specialist recruitment agency India",
  ],

  "/corporate-functions": [
    "corporate recruitment",
    "sales recruitment",
    "marketing recruitment",
    "HR recruitment",
    "finance recruitment",
    "operations recruitment",
    "administration recruitment",
    "customer experience recruitment",
    "management recruitment India",
  ],

  "/employers": [
    "recruitment services for employers",
    "hire qualified candidates",
    "business recruitment solutions",
    "talent acquisition services India",
    "permanent hiring services",
    "freelance hiring solutions",
    "employee sourcing services",
    "recruitment partner Mumbai",
    "operation management opening",
    ""
  ],

  "/candidates": [
    "submit CV",
    "candidate registration",
    "career opportunities India",
    "permanent job opportunities",
    "freelance job opportunities",
    "professional career opportunities",
    "recruitment agency for candidates",
    "job opportunities in hospitality",
    "aviation and travel careers",
    "operation management opening",
    "culniary &chef opening",
    "front office job opening",
    "sales and business development hiring",
    "Aviation managment hiring",
    "ground management recruitment",
    "aviation operation hiring",
    "event management recuritment",
    "public relation job opening"
  ],

  "/recruitment-process": [
    "recruitment process",
    "candidate screening",
    "talent sourcing process",
    "employee selection process",
    "recruitment and hiring process",
    "candidate shortlisting",
    "interview coordination services",
    "professional recruitment process",
  ],

  "/india-coverage": [
    "recruitment agency India",
    "recruitment company Mumbai",
    "talent acquisition India",
    "Mumbai recruitment services",
    "India recruitment solutions",
    "professional hiring services India",
    "recruitment consultants Mumbai",
    "nationwide recruitment services",
  ],

  "/contact": [
    "contact Flyhirre",
    "Flyhirre contact details",
    "recruitment agency contact Mumbai",
    "recruitment enquiries India",
    "employer hiring enquiries",
    "candidate registration enquiries",
    "talent solutions contact",
  ],
};

export default function SEO({ title, description, path = "" }) {
  const normalizedPath =
    path === "/" ? "/" : path.replace(/\/+$/, "") || "/";

  const url = `https://flyhirre.com${normalizedPath}`;

  const keywords =
    PAGE_KEYWORDS[normalizedPath] || PAGE_KEYWORDS["/"];

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta
        name="keywords"
        content={keywords.join(", ")}
      />

      <meta
        name="robots"
        content="index, follow, max-image-preview:large"
      />

      <link rel="canonical" href={url} />

      {/* Open Graph SEO */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={COMPANY.name} />

      {/* Twitter SEO */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
