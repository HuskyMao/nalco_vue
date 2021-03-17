const TokenKey = 'access_token'
const ExpiresKey = 'expires_in'
const TokenTypeKey = 'bearer'
const RefreshTokenKey = 'refresh_token'

export function getToken () {
  return localStorage.getItem(TokenTypeKey) + ' ' + localStorage.getItem(TokenKey)
}

export function getRefreshToken () {
	return localStorage.getItem(RefreshTokenKey)
}

export function setToken (data) {
  const ExpiresTime = new Date().getTime() + data.expires_in * 1000

  localStorage.setItem(TokenKey, data.access_token)
  localStorage.setItem(ExpiresKey, ExpiresTime)
  localStorage.setItem(TokenTypeKey, data.token_type)
  localStorage.setItem(RefreshTokenKey, data.refresh_token)
}

export function removeToken () {
  localStorage.removeItem(TokenKey)
  localStorage.removeItem(ExpiresKey)
  localStorage.removeItem(TokenTypeKey)
  localStorage.removeItem(RefreshTokenKey)
}

