import { atom } from "recoil";
import { Playlists } from "../../types";

const defaultPlaylistState: Playlists = {
  href: "",
  items: [],
  limit: 0,
  next: null,
  offset: 0,
  previous: null,
  total: 0
}

export const userPlaylistsState = atom<Playlists>({
  key: 'userPlaylists',
  default: defaultPlaylistState,
})