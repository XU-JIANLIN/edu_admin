import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {

  var in30Minutes = 1/2;

  return Cookies.set(TokenKey, token, {
        expires: in30Minutes
        })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
