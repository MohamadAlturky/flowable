// export Function to set a cookie
export function setCookie(name, value, expirationInSeconds, path = '/') {
    const expirationDate = new Date(Date.now() + expirationInSeconds * 1000);
    const cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=${path};`;
    document.cookie = cookie;
  }
  
  // export Function to get a cookie
  export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  // export Function to set auth tokens in cookies
  export function setAuthTokens(response) {
    const { accessToken, refreshToken, expiresIn } = response;
    
    // Set access token to expire as specified in the response
    setCookie('accessToken', accessToken, expiresIn);
    
    // Set refresh token to expire in 30 days
    const refreshTokenExpirationSeconds = 30 * 24 * 60 * 60; // 30 days in seconds
    setCookie('refreshToken', refreshToken, refreshTokenExpirationSeconds);
  }
  
  // export Function to retrieve auth tokens from cookies
  export function getAuthTokens() {
    return {
      accessToken: getCookie('accessToken'),
      refreshToken: getCookie('refreshToken')
    };
  }
  