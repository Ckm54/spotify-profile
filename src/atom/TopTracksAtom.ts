import { atom } from "recoil";
import { TopTracks } from "../../types";

const defaultLongTermTracksState: TopTracks = {
  items: [],
  total: 0,
  limit: 0,
  offset: 0,
  href: "",
  next: "",
  previous: null
}

export const longTermTracksState = atom<TopTracks>({
  key: 'longTermTracks',
  default: defaultLongTermTracksState,
});

export const mediumTermTracksState = atom<TopTracks>({
  key: 'mediumTermTracks',
  default: defaultLongTermTracksState,
})

export const shortTermTracksState = atom<TopTracks>({
  key: 'shortTermTracks',
  default: defaultLongTermTracksState,
})