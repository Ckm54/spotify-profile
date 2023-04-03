// CALLING SPOTIFY API ENDPOINTS

import axios from "axios";
import { ArtistsFollowed, TopArtists, UserProfile } from "../../types";
import { getAccessToken } from "./spotify";

const token = getAccessToken();
const BASE_URL = 'https://api.spotify.com/v1';

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
}

/**
 * Get Current user's profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 */
export const getUserProfile = async () =>{
  const response = await axios.get(`${BASE_URL}/me`, { headers });
  if(response.status === 200) {
    const data: UserProfile = response.data;
    return data;
  } else {
    return response.statusText;
  }
}

/**
 * Get current user's followed artists
 * https://developer.spotify.com/documentation/web-api/reference/get-followed
*/ 
export const getFollowing = async () => {
  const response = await axios.get(`${BASE_URL}/me/following?type=artist`, { headers });
  if(response.status === 200) {
    const data: ArtistsFollowed = response.data;
    return data;
  } else {
    return response.statusText;
  }
}

/**
 * Get user's top items
 * https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 */
export const getTopArtists = async() => {
  const response = await axios.get(`${BASE_URL}/me/top/artists?limit=8`, { headers });
  if(response.status === 200) {
    const data: TopArtists = response.data;
    return data;
  } else {
    return response.statusText;
  }
}