import { atom } from "recoil";

export const artistNameState = atom<string>({
  key: 'artistName',
  default: ''
})