import React, { useState } from "react";
import { submitForm, submitJson } from "../api";

const industries = ["Travel & Tourism", "Hospitality", "Aviation", "Events", "PR", "Corporate Communications", "Other"];
const functions = ["Sales & Business Development", "Marketing", "Human Resources", "Operations", "Finance & Accounts", "Administration", "Customer Experience", "Management"];

function FileField({ label, name, accept, multiple, required, hint, onChange, files }) {
  return (
    <label className={"file-field" + (multiple ? " full" : "")}>
      {label}{required && <span className="required-mark"> *</span>}
      <input name={name} type="file" accept={accept} multiple={multiple} required={required} onChange={onChange} />
      {hint && <small>{hint}</small>}
      {files?.length > 0 && <div className="selected-files">{files.map((file) => <span key={file.name}>{file.name}</span>)}</div>}
    </label>
  );
}

export function EmployerForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [documents, setDocuments] = useState({ incorporationDocument: [], gstDocument: [], panDocument: [], authorizationDocument: [] });

  function pickDocument(name, files) {
    setDocuments((current) => ({ ...current, [name]: Array.from(files || []) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    const hasDocument = Object.values(documents).some((files) => files.length);
    if (!hasDocument) {
      setError("Please upload at least one company verification document.");
      setLoading(false);
      return;
    }
    try {
      await submitForm("/employers", data);
      setSent(true);
      form.reset();
      setDocuments({ incorporationDocument: [], gstDocument: [], panDocument: [], authorizationDocument: [] });
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  if (sent) return <div className="success-box"><strong>Hiring requirement submitted.</strong><p>Thank you. Our recruitment team will review your requirement and company verification documents and get in touch.</p></div>;

  return <form className="form-grid" onSubmit={handleSubmit}>
    <label>Full Name<input name="fullName" required placeholder="Your full name" /></label>
    <label>Company Name<input name="companyName" required placeholder="Company name" /></label>
    <label>Work Email<input name="workEmail" required type="email" placeholder="name@company.com" /></label>
    <label>Phone Number<input name="phone" required placeholder="+91" /></label>
    <label>Industry<select name="industry" defaultValue={industries[0]}>{industries.map((x) => <option key={x}>{x}</option>)}</select></label>
    <label>Recruitment Type<select name="recruitmentType"><option>Permanent</option><option>Freelance</option><option>International</option></select></label>
    <label>Hiring Function<select name="hiringFunction">{functions.map((x) => <option key={x}>{x}</option>)}</select></label>
    <label>Number of Positions<input name="numberOfPositions" type="number" min="1" defaultValue="1" placeholder="e.g. 3" /></label>
    <label className="full">Requirement Details<textarea name="requirementDetails" required rows="5" placeholder="Tell us about the role, experience and hiring timeline"></textarea></label>
    <div className="verification-section full"><span className="verification-title">COMPANY VERIFICATION DOCUMENTS</span><p>Upload at least one official company document. You may provide all available documents for faster verification.</p></div>
    <FileField label="Company Registration / Incorporation Certificate" name="incorporationDocument" accept=".pdf,.jpg,.jpeg,.png,.webp" hint="PDF, JPG, PNG or WEBP. Maximum 10 MB." files={documents.incorporationDocument} onChange={(e) => pickDocument("incorporationDocument", e.target.files)} />
    <FileField label="GST Certificate" name="gstDocument" accept=".pdf,.jpg,.jpeg,.png,.webp" hint="Optional · Maximum 10 MB." files={documents.gstDocument} onChange={(e) => pickDocument("gstDocument", e.target.files)} />
    <FileField label="Company PAN" name="panDocument" accept=".pdf,.jpg,.jpeg,.png,.webp" hint="Optional · Maximum 10 MB." files={documents.panDocument} onChange={(e) => pickDocument("panDocument", e.target.files)} />
    <FileField label="Authorisation Letter" name="authorizationDocument" accept=".pdf,.jpg,.jpeg,.png,.webp" hint="Optional · Maximum 10 MB." files={documents.authorizationDocument} onChange={(e) => pickDocument("authorizationDocument", e.target.files)} />
    {error && <div className="form-error full">{error}</div>}
    <button className="btn gold full" type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Hiring Requirement"} <span>→</span></button>
  </form>;
}

export function CandidateForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cv, setCv] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await submitForm("/candidates", data);
      setSent(true);
      form.reset();
      setCv([]);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  if (sent) return <div className="success-box"><strong>Profile submitted.</strong><p>Thank you for sharing your CV. Our team will review your information and contact you when a relevant opportunity matches your profile.</p></div>;

  return <form className="form-grid" onSubmit={handleSubmit}>
    <label>Full Name<input name="fullName" required placeholder="Your full name" /></label>
    <label>Email Address<input name="email" required type="email" placeholder="you@email.com" /></label>
    <label>Phone Number<input name="phone" required placeholder="+91" /></label>
    <label>Current Location<input name="currentLocation" placeholder="City, State" /></label>
    <label>Total Experience<input name="totalExperience" placeholder="e.g. 5 years" /></label>
    <label>Current / Previous Role<input name="currentRole" placeholder="Job title" /></label>
    <label>Industry<select name="industry">{industries.slice(0, 6).map((x) => <option key={x}>{x}</option>)}</select></label>
    <label>Employment Preference<select name="employmentPreference"><option>Permanent</option><option>Freelance</option><option>Open to Both</option></select></label>
    <label>Preferred Location<input name="preferredLocation" placeholder="Mumbai / Pune / India / Flexible" /></label>
    <label>LinkedIn Profile<input name="linkedinProfile" type="url" placeholder="https://linkedin.com/in/..." /></label>
    <FileField label="CV / Resume" name="cv" accept=".pdf,.doc,.docx" required hint="PDF, DOC or DOCX. Maximum 5 MB." files={cv} onChange={(e) => setCv(Array.from(e.target.files || []))} />
    <label>Availability<input name="availability" placeholder="Immediate / 15 days / 30 days" /></label>
    <label className="full">Additional Information<textarea name="additionalInformation" rows="5" placeholder="Tell us about your skills, preferences or career goals"></textarea></label>
    {error && <div className="form-error full">{error}</div>}
    <button className="btn gold full" type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Your CV"} <span>→</span></button>
  </form>;
}


export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
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

  if (sent) return <div className="success-box"><strong>Enquiry submitted successfully.</strong><p>Thank you for contacting Flyhirre. Our team has received your enquiry and will get back to you shortly.</p><button className="btn gold" type="button" onClick={() => setSent(false)}>Send Another Enquiry <span>→</span></button></div>;

  return <form className="form-grid" onSubmit={handleSubmit}>
    <label>Full Name<input name="name" required placeholder="Your full name" /></label>
    <label>Email Address<input name="email" required type="email" placeholder="you@email.com" /></label>
    <label>Phone Number<input name="phone" placeholder="+91" /></label>
    <label>Subject<input name="subject" required placeholder="How can we help?" /></label>
    <label className="full">Message<textarea name="message" required rows="6" placeholder="Tell us how we can help you..."></textarea></label>
    {error && <div className="form-error full">{error}</div>}
    <button className="btn gold full" type="submit" disabled={loading}>{loading ? "Sending..." : "Send Enquiry"} <span>→</span></button>
  </form>;
}
