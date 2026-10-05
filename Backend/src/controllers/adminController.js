const User = require("../models/User");
const Contact = require("../models/Contact");
const Candidate = require("../models/Candidate");
const Employer = require("../models/Employer");

const dashboard = async (req, res) => {
  const [users, enquiries, candidates, employers, newCandidates, newEmployers, pendingVerification] = await Promise.all([
    User.countDocuments(),
    Contact.countDocuments(),
    Candidate.countDocuments(),
    Employer.countDocuments(),
    Candidate.countDocuments({ status: "NEW" }),
    Employer.countDocuments({ status: "NEW" }),
    Employer.countDocuments({ verificationStatus: { $in: ["PENDING", "UNDER_REVIEW", "NEEDS_MORE_DOCUMENTS"] } }),
  ]);

  res.json({
    success: true,
    stats: { users, enquiries, candidates, employers, newCandidates, newEmployers, pendingVerification },
  });
};

module.exports = { dashboard };
