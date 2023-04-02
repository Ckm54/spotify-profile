import axios from "axios";


const TOKEN_EXPIRY_TIME = 3600 * 1000; // 1 hour in milliseconds

const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now().toString());
const setLocalAccessToken = (token: string) => {
  setTokenTimestamp();
  window.localStorage.setItem('spotify_access_token', token);
}
const setLocalRefreshToken = (token: string) => window.localStorage.setItem('spotify_refresh_token', token);

const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp');
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');

// refresh token
const refreshAccessToken = async() => {
  try {
    const { data } = await axios.get('')
  } catch (error) {
    
  }
}

