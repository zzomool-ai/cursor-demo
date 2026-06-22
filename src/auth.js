import { randomBytes } from 'node:crypto';
import { parseEmail } from './validator.js';
import { verifyPassword } from './users.js';

/** @type {Map<string, { email: string, createdAt: number }>} */
const sessions = new Map();

/**
 * 로그인을 처리하고 세션 토큰을 발급한다.
 * @param {string} email - 이메일
 * @param {string} password - 비밀번호
 * @returns {{ ok: true, status: number, token: string } | { ok: false, status: number, message: string }}
 */
export function login(email, password) {
  const normalized = parseEmail(email);
  if (!normalized) {
    return { ok: false, status: 400, message: '잘못된 요청입니다.' };
  }

  if (typeof password !== 'string' || password.length === 0) {
    return { ok: false, status: 400, message: '잘못된 요청입니다.' };
  }

  if (!verifyPassword(normalized, password)) {
    return {
      ok: false,
      status: 401,
      message: '이메일 또는 비밀번호가 올바르지 않습니다.',
    };
  }

  const token = randomBytes(32).toString('hex');
  sessions.set(token, { email: normalized, createdAt: Date.now() });

  return { ok: true, status: 200, token };
}
