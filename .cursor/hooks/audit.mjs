import { appendFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const hookDir = dirname(fileURLToPath(import.meta.url));
const logDir = join(hookDir, 'logs');
const logFile = join(logDir, 'audit.log');

/**
 * stdin에서 훅 JSON 페이로드를 읽는다.
 * @returns {Promise<string>}
 */
function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });
    process.stdin.on('end', () => resolve(data));
  });
}

/**
 * 훅 이벤트 페이로드를 감사 로그에 기록한다.
 * @param {string} input - 훅 JSON 문자열
 */
function writeAuditLog(input) {
  mkdirSync(logDir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  appendFileSync(logFile, `${timestamp} ${input}\n`, 'utf8');
}

const input = await readStdin();
writeAuditLog(input);

try {
  const payload = JSON.parse(input || '{}');
  if (payload.command !== undefined) {
    process.stdout.write('{ "permission": "allow" }\n');
  }
} catch {
  // JSON 파싱 실패 시 로그만 남긴다.
}
