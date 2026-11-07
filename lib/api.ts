const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
export async function runDemo() {
  const response = await fetch(`${API_BASE}/api/v1/simulations/demo/run`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ seed: 42 })
  });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}
export async function checkHealth() {
  const response = await fetch(`${API_BASE}/api/v1/health`);
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  return response.json();
}
