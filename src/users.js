import { scryptSync, randomBytes, timingSafeEqual } from 'node:crypto';

/** @type {Map<string, { salt: Buffer, hash: Buffer }>} */
const users = new Map();

/**
 * 비밀번호를 scrypt로 해시한다.
 * @param {string} password - 평문 비밀번호
 * @param {Buffer} salt - 솔트
 * @returns {Buffer} 해시
 */
function hashPassword(password, salt) {
  return scryptSync(password, salt, 64);
}

/**
 * 사용자를 등록한다.
 * @param {string} email - 정규화된 이메일
 * @param {string} password - 평문 비밀번호
 */
function registerUser(email, password) {
  const salt = randomBytes(16);
  const hash = hashPassword(password, salt);
  users.set(email, { salt, hash });
}

registerUser('admin@example.com', 'password123');

/**
 * 이메일과 비밀번호가 일치하는지 검증한다.
 * @param {string} email - 정규화된 이메일
 * @param {string} password - 평문 비밀번호
 * @returns {boolean} 일치하면 true
 */
export function verifyPassword(email, password) {
  const user = users.get(email);
  if (!user) {
    return false;
  }

  const hash = hashPassword(password, user.salt);
  if (hash.length !== user.hash.length) {
    return false;
  }

  return timingSafeEqual(hash, user.hash);
}
