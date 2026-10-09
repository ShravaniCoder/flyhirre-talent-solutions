export const API_URL = import.meta.env.VITE_API_URL || "https://api.flyhirre.com/api";

export async function submitForm(endpoint, formData) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    body: formData,
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || "Unable to submit the form.");
  return result;
}

export async function submitJson(endpoint, body) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || "Unable to submit the form.");
  return result;
}
