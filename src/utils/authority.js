
export function getAuthority() {
  return localStorage.getItem('devopstools-pro-authority') || '';
}

export function setAuthority(authority) {
  return localStorage.setItem('devopstools-pro-authority', authority);
}
