const industryRoles = {
  "Travel & Tourism": [
    "Travel Consultant / Travel Advisor",
    "Travel Operations",
    "Tour Operations",
    "Reservations & Ticketing",
    "Corporate Travel",
    "MICE & Destination Management",
    "Travel Sales & Business Development",
    "Marketing & Brand",
    "HR & Finance",
    "Operations & Administration",
  ],

  Hospitality: [
    "Hotel Operations",
    "Front Office & Guest Relations",
    "Food & Beverage",
    "Housekeeping",
    "Culinary & Chef Roles",
    "Sales & Business Development",
    "Marketing & Brand",
    "HR & Finance",
    "Revenue Management",
    "Operations & Administration",
  ],

  Aviation: [
    "Aviation Management",
    "Airline Management",
    "Airport Management",
    "Aviation Operations",
    "Airline Operations",
    "Ground Operations Management",
    "Aviation Sales & Commercial",
    "Revenue Management",
    "Aviation Customer Experience",
    "Aviation Safety & Compliance",
    "Aviation Marketing & Communications",
    "HR & Finance",
    "Business Development & Administration",
  ],

  "Events & MICE": [
    "Event Management",
    "Event Operations",
    "Event Production",
    "Event Coordination",
    "Client Servicing",
    "Conference & Exhibition Management",
    "MICE Operations",
    "Sales & Business Development",
    "Marketing & Communications",
    "HR, Finance & Administration",
  ],

  "PR & Corporate Communications": [
    "Public Relations",
    "Corporate Communications",
    "Media Relations",
    "Content & Communications",
    "Brand Communications",
    "Digital Communications",
    "Social Media",
    "Client Servicing",
    "Account Management",
    "Marketing & Business Development",
  ],

  Other: [
    "Other / Not Listed",
  ],
};

const industries = Object.keys(industryRoles);

function isValidIndustry(industry) {
  return industries.includes(industry);
}

function isValidIndustryRole(industry, role) {
  return Boolean(
    industry &&
      role &&
      industryRoles[industry] &&
      industryRoles[industry].includes(role)
  );
}

module.exports = {
  industryRoles,
  industries,
  isValidIndustry,
  isValidIndustryRole,
};
