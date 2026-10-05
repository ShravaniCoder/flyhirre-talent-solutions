export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const SERVER_URL = API_URL.replace(/\/api\/?$/, "");

export async function api(path, options = {}) {
  const token = localStorage.getItem("flyhirre_admin_token");
  const headers = { ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!(options.body instanceof FormData)) headers["Content-Type"] = "application/json";
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) {
    localStorage.removeItem("flyhirre_admin_token");
    localStorage.removeItem("flyhirre_admin_user");
  }
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}
