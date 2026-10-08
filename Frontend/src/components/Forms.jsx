import React, { useState } from "react";
import { submitForm, submitJson } from "../api";

/* =========================================================
   INDUSTRIES
========================================================= */

const industries = [
  "Travel & Tourism",
  "Hospitality",
  "Aviation",
  "Events & MICE",
  "PR & Corporate Communications",
  "Other",
];

/* =========================================================
   INDUSTRY-WISE ROLES
========================================================= */

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


/* =========================================================
   FILE FIELD
========================================================= */

function FileField({
  label,
  name,
  accept,
  multiple,
  required,
  hint,
  onChange,
  files,
}) {
  return (
    <label className={"file-field" + (multiple ? " full" : "")}>
      {label}
      {required && <span className="required-mark"> *</span>}

      <input
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        required={required}
        onChange={onChange}
      />

      {hint && <small>{hint}</small>}

      {files?.length > 0 && (
        <div className="selected-files">
          {files.map((file) => (
            <span key={file.name}>{file.name}</span>
          ))}
        </div>
      )}
    </label>
  );
}


/* =========================================================
   EMPLOYER FORM
========================================================= */

export function EmployerForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [employerIndustry, setEmployerIndustry] = useState(
    industries[0]
  );

  const [documents, setDocuments] = useState({
    incorporationDocument: [],
    gstDocument: [],
    panDocument: [],
    authorizationDocument: [],
  });

  function pickDocument(name, files) {
    setDocuments((current) => ({
      ...current,
      [name]: Array.from(files || []),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const hasDocument = Object.values(documents).some(
      (files) => files.length
    );

    if (!hasDocument) {
      setError(
        "Please upload at least one company verification document."
      );
      setLoading(false);
      return;
    }

    try {
      await submitForm("/employers", data);

      setSent(true);

      form.reset();

      setEmployerIndustry(industries[0]);

      setDocuments({
        incorporationDocument: [],
        gstDocument: [],
        panDocument: [],
        authorizationDocument: [],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="success-box">
        <strong>Hiring requirement submitted.</strong>

        <p>
          Thank you. Our recruitment team will review your
          requirement and company verification documents and get
          in touch.
        </p>
      </div>
    );
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>

      {/* Full Name */}
      <label>
        Full Name
        <input
          name="fullName"
          required
          placeholder="Your full name"
        />
      </label>

      {/* Company Name */}
      <label>
        Company Name
        <input
          name="companyName"
          required
          placeholder="Company name"
        />
      </label>

      {/* Work Email */}
      <label>
        Work Email
        <input
          name="workEmail"
          required
          type="email"
          placeholder="name@company.com"
        />
      </label>

      {/* Phone */}
      <label>
        Phone Number
        <input
          name="phone"
          required
          placeholder="+91"
        />
      </label>

      {/* Industry */}
      <label>
        Industry

        <select
          name="industry"
          value={employerIndustry}
          onChange={(e) =>
            setEmployerIndustry(e.target.value)
          }
          required
        >
          {industries.map((industry) => (
            <option
              key={industry}
              value={industry}
            >
              {industry}
            </option>
          ))}
        </select>
      </label>

      {/* Hiring Role */}
      <label>
        Hiring Role

        <select
          name="hiringRole"
          required
          defaultValue=""
        >
          <option value="" disabled>
            Select hiring role
          </option>

          {(industryRoles[employerIndustry] || []).map(
            (role) => (
              <option
                key={role}
                value={role}
              >
                {role}
              </option>
            )
          )}
        </select>
      </label>

      {/* Recruitment Type */}
      <label>
        Recruitment Type

        <select name="recruitmentType">
          <option value="Permanent">
            Permanent
          </option>

          <option value="Freelance">
            Freelance
          </option>

          <option value="International">
            International
          </option>
        </select>
      </label>

      {/* Number of Positions */}
      <label>
        Number of Positions

        <input
          name="numberOfPositions"
          type="number"
          min="1"
          defaultValue="1"
          placeholder="e.g. 3"
        />
      </label>

      {/* Requirement Details */}
      <label className="full">
        Requirement Details

        <textarea
          name="requirementDetails"
          required
          rows="5"
          placeholder="Tell us about the role, experience and hiring timeline"
        ></textarea>
      </label>

      {/* Verification Heading */}
      <div className="verification-section full">
        <span className="verification-title">
          COMPANY VERIFICATION DOCUMENTS
        </span>

        <p>
          Upload at least one official company document.
          You may provide all available documents for faster
          verification.
        </p>
      </div>

      {/* Incorporation Document */}
      <FileField
        label="Company Registration / Incorporation Certificate"
        name="incorporationDocument"
        accept=".pdf,.jpg,.jpeg,.png,.webp"
        hint="PDF, JPG, PNG or WEBP. Maximum 10 MB."
        files={documents.incorporationDocument}
        onChange={(e) =>
          pickDocument(
            "incorporationDocument",
            e.target.files
          )
        }
      />

      {/* GST */}
      <FileField
        label="GST Certificate"
        name="gstDocument"
        accept=".pdf,.jpg,.jpeg,.png,.webp"
        hint="Optional · Maximum 10 MB."
        files={documents.gstDocument}
        onChange={(e) =>
          pickDocument(
            "gstDocument",
            e.target.files
          )
        }
      />

      {/* PAN */}
      <FileField
        label="Company PAN"
        name="panDocument"
        accept=".pdf,.jpg,.jpeg,.png,.webp"
        hint="Optional · Maximum 10 MB."
        files={documents.panDocument}
        onChange={(e) =>
          pickDocument(
            "panDocument",
            e.target.files
          )
        }
      />

      {/* Authorization */}
      <FileField
        label="Authorisation Letter"
        name="authorizationDocument"
        accept=".pdf,.jpg,.jpeg,.png,.webp"
        hint="Optional · Maximum 10 MB."
        files={documents.authorizationDocument}
        onChange={(e) =>
          pickDocument(
            "authorizationDocument",
            e.target.files
          )
        }
      />

      {/* Error */}
      {error && (
        <div className="form-error full">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        className="btn gold full"
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Submitting..."
          : "Submit Hiring Requirement"}

        <span>→</span>
      </button>

    </form>
  );
}


/* =========================================================
   CANDIDATE FORM
========================================================= */

export function CandidateForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [candidateIndustry, setCandidateIndustry] =
    useState(industries[0]);

  const [cv, setCv] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await submitForm("/candidates", data);

      setSent(true);

      form.reset();

      setCandidateIndustry(industries[0]);

      setCv([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="success-box">
        <strong>Profile submitted.</strong>

        <p>
          Thank you for sharing your CV. Our team will
          review your information and contact you when a
          relevant opportunity matches your profile.
        </p>
      </div>
    );
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>

      {/* Full Name */}
      <label>
        Full Name

        <input
          name="fullName"
          required
          placeholder="Your full name"
        />
      </label>

      {/* Email */}
      <label>
        Email Address

        <input
          name="email"
          required
          type="email"
          placeholder="you@email.com"
        />
      </label>

      {/* Phone */}
      <label>
        Phone Number

        <input
          name="phone"
          required
          placeholder="+91"
        />
      </label>

      {/* Current Location */}
      <label>
        Current Location

        <input
          name="currentLocation"
          placeholder="City, State"
        />
      </label>

      {/* Experience */}
      <label>
        Total Experience

        <input
          name="totalExperience"
          placeholder="e.g. 5 years"
        />
      </label>

      {/* Current Role */}
      <label>
        Current / Previous Role

        <input
          name="currentRole"
          placeholder="Job title"
        />
      </label>

      {/* Industry */}
      <label>
        Industry

        <select
          name="industry"
          value={candidateIndustry}
          onChange={(e) =>
            setCandidateIndustry(e.target.value)
          }
          required
        >
          {industries.map((industry) => (
            <option
              key={industry}
              value={industry}
            >
              {industry}
            </option>
          ))}
        </select>
      </label>

      {/* Candidate Role */}
      <label>
        Candidate Role

        <select
          name="candidateRole"
          required
          defaultValue=""
        >
          <option value="" disabled>
            Select your preferred role
          </option>

          {(industryRoles[candidateIndustry] || []).map(
            (role) => (
              <option
                key={role}
                value={role}
              >
                {role}
              </option>
            )
          )}
        </select>
      </label>

      {/* Employment Preference */}
      <label>
        Employment Preference

        <select name="employmentPreference">
          <option value="Permanent">
            Permanent
          </option>

          <option value="Freelance">
            Freelance
          </option>

          <option value="Open to Both">
            Open to Both
          </option>
        </select>
      </label>

      {/* Preferred Location */}
      <label>
        Preferred Location

        <input
          name="preferredLocation"
          placeholder="Mumbai / Pune / India / Flexible"
        />
      </label>

      {/* LinkedIn */}
      <label>
        LinkedIn Profile

        <input
          name="linkedinProfile"
          type="url"
          placeholder="https://linkedin.com/in/..."
        />
      </label>

      {/* CV */}
      <FileField
        label="CV / Resume"
        name="cv"
        accept=".pdf,.doc,.docx"
        required
        hint="PDF, DOC or DOCX. Maximum 5 MB."
        files={cv}
        onChange={(e) =>
          setCv(
            Array.from(
              e.target.files || []
            )
          )
        }
      />

      {/* Availability */}
      <label>
        Availability

        <input
          name="availability"
          placeholder="Immediate / 15 days / 30 days"
        />
      </label>

      {/* Additional Information */}
      <label className="full">
        Additional Information

        <textarea
          name="additionalInformation"
          rows="5"
          placeholder="Tell us about your skills, preferences or career goals"
        ></textarea>
      </label>

      {/* Error */}
      {error && (
        <div className="form-error full">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        className="btn gold full"
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Submitting..."
          : "Submit Your CV"}

        <span>→</span>
      </button>

    </form>
  );
}


/* =========================================================
   CONTACT FORM
========================================================= */

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const form = e.currentTarget;

    const data = Object.fromEntries(
      new FormData(form).entries()
    );

    try {
      await submitJson("/contact", data);

      setSent(true);

      form.reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="success-box">
        <strong>
          Enquiry submitted successfully.
        </strong>

        <p>
          Thank you for contacting Flyhirre. Our team
          has received your enquiry and will get back
          to you shortly.
        </p>

        <button
          className="btn gold"
          type="button"
          onClick={() => setSent(false)}
        >
          Send Another Enquiry
          <span>→</span>
        </button>
      </div>
    );
  }

  return (
    <form
      className="form-grid"
      onSubmit={handleSubmit}
    >

      {/* Full Name */}
      <label>
        Full Name

        <input
          name="name"
          required
          placeholder="Your full name"
        />
      </label>

      {/* Email */}
      <label>
        Email Address

        <input
          name="email"
          required
          type="email"
          placeholder="you@email.com"
        />
      </label>

      {/* Phone */}
      <label>
        Phone Number

        <input
          name="phone"
          placeholder="+91"
        />
      </label>

      {/* Subject */}
      <label>
        Subject

        <input
          name="subject"
          required
          placeholder="How can we help?"
        />
      </label>

      {/* Message */}
      <label className="full">
        Message

        <textarea
          name="message"
          required
          rows="6"
          placeholder="Tell us how we can help you..."
        ></textarea>
      </label>

      {/* Error */}
      {error && (
        <div className="form-error full">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        className="btn gold full"
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Sending..."
          : "Send Enquiry"}

        <span>→</span>
      </button>

    </form>
  );
}