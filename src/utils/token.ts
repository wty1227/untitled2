import { ACCESS_TOKEN } from "@/store/mutation-types";
import ls from 'store'

export function getToken() {
  return ls.get(ACCESS_TOKEN)
}

export function setToken(token) {
  return ls.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000)
}

export function removeToken() {
  return ls.remove(ACCESS_TOKEN)
}
