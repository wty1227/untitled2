import { ACCESS_TOKEN } from "@/store/mutation-types";


export function getToken() {
  return localStorage.get(ACCESS_TOKEN)
}

export function setToken(token) {
  return localStorage.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000)
}

export function removeToken() {
  return localStorage.remove(ACCESS_TOKEN)
}
