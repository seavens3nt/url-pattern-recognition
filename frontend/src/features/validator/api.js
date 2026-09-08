// Sean and Jared coordinate changes to this boundary through docs/api-contract.md.
export async function getHealth(signal) {
  const response = await fetch('/api/health', { signal });
  if (!response.ok) throw new Error('Health check failed');
  return response.json();
}

export async function validateUrl(url) {
  const response = await fetch('/api/validate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  // Validation errors and the intentional 501 carry user-facing JSON messages.
  return response.json();
}
