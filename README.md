# cursor-demo

RFC 5322 기반 이메일 검증 모듈, 사용자 목록 이메일 추출·필터링 유틸, 로그인 API를 ES Module로 제공하는 프로젝트입니다.

## 테트리스 (교육용)

HTML, CSS, JavaScript만 사용하는 브라우저 테트리스 게임. `index.html`을 브라우저에서 열어 실행합니다.

## 사용법

```javascript
import { getValidEmails } from 'cursor-demo';
import { isValidEmail, normalizeEmail } from './src/email.js';
```

## 서버 실행

```bash
npm start
```

로그인 API: `POST /api/login` (email, password)

## 테스트

```bash
npm test
```

## 릴리스 노트

### v1.1.0

- 로그인 API 및 HTTP 서버 추가
- parseEmail, uniqueValidEmails 추가
- 교육용 테트리스 데모 추가
- Cursor 훅 및 릴리스 노트 스킬 추가

### v1.0.0

- RFC 5322 이메일 검증 모듈 첫 릴리스

## 라이선스

ISC
