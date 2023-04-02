import axios from "axios";
import { getHashParams } from "../utils";

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
    const { data } = await axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`);
    const { access_token } = data;

    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (error) {
    console.error(error)
  }
};

// Get access token off query params (called on application init)
export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();
  
}

