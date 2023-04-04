import { atom } from "recoil";
import { RecentPlays, TopTracks } from "../../types";

const defaultLongTermTracksState: TopTracks = {
  items: [],
  total: 0,
  limit: 0,
  offset: 0,
  href: "",
  next: "",
  previous: null
}

const defaultRecentlyPlayedTracksState: RecentPlays = {
  items: [],
  next: "",
  cursors: {
    after: '',
    before: ''
  },
  limit: 0,
  href: ""
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

export const recentlyPlayedTracksState = atom<RecentPlays>({
  key: 'recentlyPlayedTracks',
  default: defaultRecentlyPlayedTracksState,
})