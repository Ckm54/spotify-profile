import { atom } from "recoil";
import { TopArtists } from "../../types";

const defaultLongTermArtistsState: TopArtists = {
  items: [],
  total: 0,
  limit: 0,
  offset: 0,
  href: "",
  next: "",
  previous: null
}

export const longTermArtistsState = atom<TopArtists>({
  key: 'longTermArtists',
  default: defaultLongTermArtistsState,
});

export const mediumTermArtistsState = atom<TopArtists>({
  key: 'mediumTermArtists',
  default: defaultLongTermArtistsState,
})

export const shortTermArtistsState = atom<TopArtists>({
  key: 'shortTermArtists',
  default: defaultLongTermArtistsState,
})