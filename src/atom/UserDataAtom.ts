import { atom } from "recoil";
import { UserProfile } from "../../types";

const defaultUserProfileState: UserProfile = {
  country: "",
  display_name: "",
  email: "",
  explicit_content: {
    filter_enabled: false,
    filter_locked: false
  },
  external_urls: {
    spotify: ""
  },
  followers: {
    href: "",
    total: 0
  },
  href: "",
  id: "",
  images: [],
  product: "",
  type: "",
  uri: ""
}

export const userProfileState = atom<UserProfile>({
  key: 'userProfileState',
  default: defaultUserProfileState,
})