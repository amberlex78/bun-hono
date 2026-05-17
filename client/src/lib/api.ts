export const API_BASE = import.meta.env.VITE_API_BASE || "/api";

export async function getProfile() {
  const res = await fetch(`${API_BASE}/profile`, {
    headers: {
      "x-user-email": "user@example.com",
      "x-user-role": "regular"
    }
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}
