import { getValidAccessToken } from './auth';

export async function authFetch(url, options = {}) {
  const token = await getValidAccessToken();

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('Auth fetch failed');
  return res.json();
}
