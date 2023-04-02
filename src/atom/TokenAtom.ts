import { atom } from "recoil";
import { TokenState } from "../../types";


const defaultTokenState: TokenState = {
  token: ''
}

export const tokenState = atom<TokenState>({
  key: "tokenState",
  default: defaultTokenState
})

