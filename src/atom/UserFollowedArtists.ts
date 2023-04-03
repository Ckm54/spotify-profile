import { atom } from "recoil";
import { ArtistsFollowed } from "../../types";

const defaultArtistsFollowedState: ArtistsFollowed = {
  artists: {
    items: [],
    next: '',
    total: 0,
    cursors: {
      after: '',
    },
    limit: 0,
    href: ''
  }
}

export const userFollowedArtistsState = atom<ArtistsFollowed>({
  key: 'usersFolloweArtists',
  default: defaultArtistsFollowedState
})