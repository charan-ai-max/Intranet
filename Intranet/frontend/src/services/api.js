import { authService } from './authService';

const BASE_URL = 'http://localhost:5000/api';

async function apiFetch(endpoint, options = {}) {
  const token = authService.getToken();

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw error;
  }

  return res.json();
}

export default apiFetch;
