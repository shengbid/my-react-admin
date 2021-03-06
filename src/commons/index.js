export const ROUTE_BASE_NAME = process.env.BASE_NAME || '';

export function toHome() {
  window.location.href = `${ROUTE_BASE_NAME}/home`
}

export function toLogin() {
  window.location.href = `${ROUTE_BASE_NAME}/login`
}

export function isLogin() {
  const loginUser = sessionStorage.getItem('login');

  return loginUser ? true : null;
}

/**
 * 验证密码
 * @param {String,Number} pass
 * @returns {Boolean}
 */
export function passwordValid(pass) {
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/
  return reg.test(pass)
}

/**
 * 验证电话号码
 * @param {String,Number} phone
 * @returns {Boolean}
 */
export function phoneValid(phone) {
  const reg = /^1[3|4|5|6|7|8][0-9]{9}$/
  return reg.test(phone)
}