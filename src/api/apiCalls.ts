// CALLING SPOTIFY API ENDPOINTS

import axios from "axios";
import { getAccessToken } from "./spotify";

const token = getAccessToken();

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
}

/**
 * Get Current user's profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 */
export const getUserProfile = () => axios.get('https://api.spotify.com/v1/me', { headers }).then(res => res.data);