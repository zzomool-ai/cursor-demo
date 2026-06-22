/**
 * RFC 5322 addr-spec 정규식 (도메인 리터럴 IP 옥텟 버그 수정본)
 *
 * 출처:
 * - https://emailregex.com/ — General Email Regex (RFC 5322 Official Standard)
 * - https://stackoverflow.com/questions/201323/what-is-the-best-regular-expression-for-validating-email-addresses
 *   (emailregex.com IP 패턴의 `00` 옥텟 허용 버그 수정)
 * - https://www.regular-expressions.info/email.html — RFC 5322 preferred syntax (RFC 1035)
 * - https://www.rfc-editor.org/rfc/rfc5322#section-3.4.1 — addr-spec 공식 정의
 */
const RFC5322_EMAIL_REGEX = new RegExp(
  '^' +
    '(?:' +
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*" +
    '|"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*"' +
    ')@' +
    '(?:' +
    '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?' +
    '|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])' +
    '|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\]' +
    ')' +
    '$',
  'i',
);

const MAX_EMAIL_LENGTH = 254;
const MAX_LOCAL_PART_LENGTH = 64;

/**
 * 이메일 문자열이 RFC 5322 형식과 길이 제한을 만족하는지 검증한다.
 * @param {string} email - 검증할 이메일
 * @returns {boolean} 유효하면 true
 */
export function isValidEmail(email) {
  if (typeof email !== 'string') return false;

  const atIndex = email.lastIndexOf('@');
  if (atIndex <= 0 || atIndex > MAX_LOCAL_PART_LENGTH) return false;
  if (email.length > MAX_EMAIL_LENGTH) return false;

  return RFC5322_EMAIL_REGEX.test(email);
}

/**
 * 이메일 문자열의 앞뒤 공백을 제거하고 소문자로 정규화한다.
 * @param {string} email - 정규화할 이메일
 * @returns {string | null} 정규화된 이메일. 유효하지 않은 입력이면 null
 */
export function normalizeEmail(email) {
  if (typeof email !== 'string') return null;

  const normalized = email.trim().toLowerCase();
  return normalized.length > 0 ? normalized : null;
}

/**
 * 이메일을 정규화한 뒤 RFC 5322 형식과 길이 제한을 검증한다.
 * @param {string} email - 입력 이메일
 * @returns {string | null} 유효한 정규화 이메일. 실패 시 null
 */
export function parseEmail(email) {
  const normalized = normalizeEmail(email);
  if (!normalized || !isValidEmail(normalized)) {
    return null;
  }
  return normalized;
}
