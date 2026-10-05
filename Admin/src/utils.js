export const candidateStatuses = ["NEW", "REVIEWING", "SHORTLISTED", "CONTACTED", "REJECTED", "HIRED"];
export const employerStatuses = ["NEW", "CONTACTED", "IN_PROGRESS", "CLOSED"];
export const verificationStatuses = ["PENDING", "UNDER_REVIEW", "VERIFIED", "NEEDS_MORE_DOCUMENTS", "REJECTED"];
export function formatDate(value){ return new Date(value).toLocaleString("en-IN", { dateStyle:"medium", timeStyle:"short" }); }
export function fileUrl(path, SERVER_URL){ return path ? `${SERVER_URL}${path}` : "#"; }
