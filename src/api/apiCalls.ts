// CALLING SPOTIFY API ENDPOINTS

import axios from "axios";
import { UserProfile } from "../../types";
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
export const getUserProfile = async () =>{
  const response = await axios.get('https://api.spotify.com/v1/me', { headers });
  if(response.status === 200) {
    const data: UserProfile = response.data;
    return data;
  } else {
    return response.statusText;
  }
}