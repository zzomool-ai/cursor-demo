import http from 'node:http';
import { login } from './auth.js';

const PORT = Number(process.env.PORT) || 3000;
const MAX_BODY_BYTES = 1024;

/**
 * 요청 본문을 읽어 문자열로 반환한다.
 * @param {import('node:http').IncomingMessage} req - HTTP 요청
 * @returns {Promise<string>} 본문 문자열
 */
function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    let size = 0;

    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error('BODY_TOO_LARGE'));
        req.destroy();
        return;
      }
      data += chunk;
    });

    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

/**
 * JSON 응답을 전송한다.
 * @param {import('node:http').ServerResponse} res - HTTP 응답
 * @param {number} status - 상태 코드
 * @param {object} body - 응답 본문
 */
function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

/**
 * POST /api/login 요청을 처리한다.
 * @param {import('node:http').IncomingMessage} req - HTTP 요청
 * @param {import('node:http').ServerResponse} res - HTTP 응답
 */
async function handleLogin(req, res) {
  let body;
  try {
    body = await readBody(req);
  } catch (error) {
    if (error instanceof Error && error.message === 'BODY_TOO_LARGE') {
      sendJson(res, 413, { error: '요청 본문이 너무 큽니다.' });
      return;
    }
    sendJson(res, 400, { error: '잘못된 요청입니다.' });
    return;
  }

  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    sendJson(res, 400, { error: '잘못된 요청입니다.' });
    return;
  }

  const result = login(payload.email, payload.password);

  if (!result.ok) {
    sendJson(res, result.status, { error: result.message });
    return;
  }

  sendJson(res, result.status, { token: result.token });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/login') {
    await handleLogin(req, res);
    return;
  }

  sendJson(res, 404, { error: 'Not Found' });
});

server.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
