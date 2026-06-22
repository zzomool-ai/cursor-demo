import { isValidEmail, normalizeEmail, parseEmail } from './validator.js';

/**
 * 사용자 배열에서 email 필드를 추출한다.
 * @param {Array<{ email?: string }>} users - 사용자 객체 배열
 * @returns {Array} email 값 배열. 입력이 배열이 아니면 빈 배열
 */
export function extractEmails(users) {
  if (!Array.isArray(users)) {
    return [];
  }
  return users.map((user) => user.email);
}

export { isValidEmail, normalizeEmail, parseEmail };

/**
 * 사용자 배열에서 유효한 이메일만 추출한다.
 * @param {Array<{ email?: string }>} users - 사용자 객체 배열
 * @returns {string[]} 유효한 이메일 문자열 배열
 */
export function getValidEmails(users) {
  return extractEmails(users).filter(isValidEmail);
}

/**
 * 사용자 배열에서 유효한 이메일만 추출하고 중복을 제거한다.
 * @param {Array<{ email?: string }>} users - 사용자 객체 배열
 * @returns {string[]} 중복이 제거된 유효 이메일 문자열 배열
 */
export function uniqueValidEmails(users) {
  return [...new Set(getValidEmails(users))];
}
