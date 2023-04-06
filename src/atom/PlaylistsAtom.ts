import { atom } from "recoil";
import { PlaylistInfoType, Playlists } from "../../types";

const defaultPlaylistState: Playlists = {
  href: "",
  items: [],
  limit: 0,
  next: null,
  offset: 0,
  previous: null,
  total: 0,
};

const defaultPlaylistDetails: PlaylistInfoType = {
  collaborative: false,
  description: "",
  external_urls: {
    spotify: "",
  },
  followers: {
    total: 0,
    href: null,
  },
  href: "",
  id: "",
  images: [],
  name: "",
  owner: {
    external_urls: {
      spotify: "",
    },
    href: "",
    id: "",
    uri: "",
  },
  primary_color: null,
  public: false,
  snapshot_id: "",
  tracks: {
    href: "",
    items: [],
    limit: 0,
    next: null,
    offset: 0,
    previous: null,
    total: 0,
  },
  type: "",
  uri: "",
};

export const userPlaylistsState = atom<Playlists>({
  key: "userPlaylists",
  default: defaultPlaylistState,
});

export const playlistDetailsState = atom<PlaylistInfoType>({
  key: "playlistDetails",
  default: defaultPlaylistDetails,
});
