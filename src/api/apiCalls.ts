// CALLING SPOTIFY API ENDPOINTS

import axios from "axios";
import {
  ArtistAlbumsType,
  ArtistProfile,
  ArtistTopTracksType,
  ArtistsFollowed,
  Playlists,
  RecentPlays,
  RelatedArtistsData,
  TopArtists,
  TopItemsParams,
  TopTracks,
  UserProfile
} from "../../types";
import { getAccessToken } from "./spotify";

const token = getAccessToken();
const BASE_URL = "https://api.spotify.com/v1";

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

/**
 * Get Current user's profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 */
export const getUserProfile = async () => {
  const response = await axios.get(`${BASE_URL}/me`, { headers });
  if (response.status === 200) {
    const data: UserProfile = response.data;
    return data;
  } else {
    return response.statusText;
  }
};

/**
 * Get current user's followed artists
 * https://developer.spotify.com/documentation/web-api/reference/get-followed
 */
export const getFollowing = async () => {
  const response = await axios.get(`${BASE_URL}/me/following?type=artist`, {
    headers,
  });
  if (response.status === 200) {
    const data: ArtistsFollowed = response.data;
    return data;
  } else {
    return response.statusText;
  }
};

/**
 * Get user's top items
 * https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 */
export const getTopArtists = async (params: TopItemsParams) => {
  const { limit, timeRange } = params;
  const response = await axios.get(
    `${BASE_URL}/me/top/artists?limit=${limit}&time_range=${timeRange}`,
    { headers }
  );
  if (response.status === 200) {
    const data: TopArtists = response.data;
    return data;
  } else {
    return response.statusText;
  }
};

export const getTopTracks = async (params: TopItemsParams) => {
  const { limit, timeRange } = params;
  const response = await axios.get(
    `${BASE_URL}/me/top/tracks?limit=${limit}&time_range=${timeRange}`,
    { headers }
  );
  if (response.status === 200) {
    const data: TopTracks = response.data;
    return data;
  } else {
    return response.statusText;
  }
};

/**
 * Get user's playlists
 * https://developer.spotify.com/documentation/web-api/reference/get-list-users-playlists
 */
export const getUserPlaylists = async (userId: string) => {
  const response = await axios.get(`${BASE_URL}/users/${userId}/playlists`, {
    headers,
  });
  if (response.status === 200) {
    const data: Playlists = response.data;
    return data;
  } else {
    return response.statusText;
  }
};

/**
 * Get user's recently played tracks
 * https://developer.spotify.com/documentation/web-api/reference/get-recently-played
 */
export const getRecentlyPlayedTracks = async () => {
  const response = await axios.get(
    `${BASE_URL}/me/player/recently-played?limit=30`,
    { headers }
  );
  if (response.status === 200) {
    const data: RecentPlays = response.data;
    return data;
  } else {
    return response.statusText;
  }
};

/**
 * Get artist's profile information
 * https://developer.spotify.com/documentation/web-api/reference/get-an-artist
 */
export const getArtistProfile = async (artistId: string) => {
  const response = await axios.get(`${BASE_URL}/artists/${artistId}`, {
    headers,
  });
  if (response.status === 200) {
    const data: ArtistProfile = response.data;
    return data;
  } else {
    return response.statusText;
  }
};

/**
 * Get artist's top tracks
 * https://developer.spotify.com/documentation/web-api/reference/get-an-artists-top-tracks
 */
export const getArtistTopTracks = async (artistId: string, country: string) => {
  const response = await axios.get(
    `${BASE_URL}/artists/${artistId}/top-tracks?country=${country}`,
    { headers }
  );
  if (response.status === 200) {
    const data: ArtistTopTracksType = response.data;
    return data;
  } else {
    return response.statusText;
  }
};

/**
 * Get artist's top albums
 * https://developer.spotify.com/documentation/web-api/reference/get-an-artists-albums
 * ?country=${country}
 */
export const getArtistAlbums = async (artistId: string, groupsIncluded: string) => {
  const response = await axios.get(`${BASE_URL}/artists/${artistId}/albums?include_groups=${groupsIncluded}`, {
    headers,
  });
  if (response.status === 200) {
    const data: ArtistAlbumsType = response.data;
    return data;
  } else {
    return response.statusText;
  }
};

/**
 * Get artist's related artists
 * https://developer.spotify.com/documentation/web-api/reference/get-an-artists-related-artists
 */
export const getArtistRelatedArtists = async (artistId: string) => {
  const response = await axios.get(`${BASE_URL}/artists/${artistId}/related-artists`, {
    headers,
  });
  if (response.status === 200) {
    const data: RelatedArtistsData = response.data;
    return data;
  } else {
    return response.statusText;
  }
};

/**
 * check if user follows an artist
 * https://developer.spotify.com/documentation/web-api/reference/check-current-user-follows
 */
export const getIsFollowing = async (id: string) => {
  const response = await axios.get(
    `${BASE_URL}/me/following/contains?type=artist&ids=${id}`,
    { headers }
  );
  if (response.status === 200) {
    const data: boolean[] = response.data;
    return data;
  } else {
    return response.statusText;
  }
};
