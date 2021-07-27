function setToken(token) {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
}

function getToken() {
  let token = localStorage.getItem('token');
  if (token) {
    // Check if expired, remove if it is
    const payload = JSON.parse(atob(token.split('.')[1])); // we are refering to the 2nd part aka payload
    // JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      token = null;
    }
  }
  return token;
}
// Get Token Function Notes
// If there is a token
// take the payload -> represents our users
// double check if the token is still valid (has 24 hours expiration)
// if the token is expired, then remove the token and sign the person out --> set token to null
// or if there is no token then return token


function getUserFromToken() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

function removeToken() {
  localStorage.removeItem('token');
}

export default {
  setToken,
  getToken,
  removeToken,
  getUserFromToken
};

// Notes:
//-- Persist: storing some value
//-- We are using localStorage to store the password