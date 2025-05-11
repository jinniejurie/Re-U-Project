export async function getValidAccessToken() {
    let access = localStorage.getItem('token');
    const refresh = localStorage.getItem('refresh');
  
    if (!access || isTokenExpired(access)) {
      if (refresh) {
        try {
          const res = await fetch('http://localhost:3345/api/token/refresh/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh }),
          });
  
          if (res.ok) {
            const data = await res.json();
            access = data.access;
            localStorage.setItem('token', access);
          } else {
            throw new Error('Refresh failed');
          }
        } catch (e) {
          console.error('Token refresh error:', e);
          throw e;
        }
      } else {
        throw new Error('No refresh token found');
      }
    }
  
    return access;
  }
  
  function isTokenExpired(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < Date.now() / 1000;
    } catch {
      return true;
    }
  }
  