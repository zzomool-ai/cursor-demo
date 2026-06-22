# cursor-demo

RFC 5322 기반 이메일 검증 모듈, 사용자 목록 이메일 추출·필터링 유틸, 로그인 API를 ES Module로 제공하는 프로젝트입니다.

## 테트리스 (교육용)

HTML, CSS, JavaScript만 사용하는 브라우저 테트리스 게임 프로젝트입니다. 빌드 도구 없이 바로 실행할 수 있습니다.

### 실행 방법

1. 프로젝트 루트에서 `index.html` 파일을 더블클릭하거나, 브라우저로 드래그하여 엽니다.
2. 또는 VS Code / Cursor의 **Live Server** 확장으로 `index.html`을 열어도 됩니다.
3. 화면에 10×20 빈 게임 보드, 점수(0), 시작/재시작 버튼, 조작법 안내가 보이면 정상입니다.

> **참고:** `script.js`는 ES Module(`type="module"`)을 사용합니다. 일부 브라우저에서는 `file://` 프로토콜로 열 때 모듈 로드가 차단될 수 있습니다. 이 경우 Live Server 등 로컬 HTTP 서버로 여는 것을 권장합니다.

### 파일 구성

| 파일 | 설명 |
|------|------|
| `index.html` | 게임 화면 구조 |
| `style.css` | 레이아웃 및 스타일 |
| `script.js` | 보드 초기화 및 렌더링 (게임 로직은 추후 추가) |

## 사용법

```javascript
import { getValidEmails } from 'cursor-demo';
import { isValidEmail, normalizeEmail } from './src/email.js';

const users = [
  { email: 'good@example.com' },
  { email: 'bad-email' },
];

getValidEmails(users); // ['good@example.com']
isValidEmail('user@example.com'); // true
normalizeEmail('  User@Example.COM  '); // 'user@example.com'
```

## 서버 실행

```bash
npm start
```

기본 포트 `3000`에서 HTTP 서버가 실행됩니다. 로그인 API 예시:

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'
```

## 테스트

```bash
npm test
```

## 릴리스 노트

### v1.1.0

이메일 검증 모듈을 확장하고, 사용자 로그인 API·HTTP 서버·교육용 테트리스 데모를 추가한 릴리스입니다.

#### ✨ 기능

- **사용자 로그인 API** — `POST /api/login`으로 이메일·비밀번호 인증 후 세션 토큰 발급 (`src/auth.js`, `src/server.js`)
- **비밀번호 검증** — scrypt 해시 + `timingSafeEqual`로 타이밍 공격 완화 (`src/users.js`)
- **이메일 파싱 API** — `parseEmail()`로 정규화·검증을 한 번에 처리 (`src/validator.js`)
- **중복 제거 이메일 추출** — `uniqueValidEmails()`로 유효 이메일만 Set 기반 중복 제거 (`src/email.js`)
- **HTTP 서버** — Node.js 내장 `http` 모듈 기반, `npm start`로 실행 (`src/server.js`)
- **교육용 테트리스** — HTML/CSS/JS만 사용하는 브라우저 게임 골격 (`index.html`, `style.css`, `script.js`)
- **Cursor 훅** — 에이전트 감사 로그, `rm` 명령 차단 훅 추가 (`.cursor/hooks/`)
- **릴리스 노트 스킬** — 태그/커밋 간 변경 수집·분류 워크플로 (`.cursor/skills/release-notes/`)

#### 🐛 버그 수정

- 이메일 정규식 IP 옥텟 패턴에서 `00` 등 잘못된 옥텟 허용 문제 수정 (문서·주석 보강)

#### 🧹 기타

- `node:test` 기반 로그인 단위 테스트 추가 (`src/auth.test.js`, `npm test`에 포함)
- `docs/validator.md`에 정규식 출처·RFC 참조 표 추가
- PR 점검 커맨드 추가 (`.cursor/commands/prep-pr.md`)
- Security Auditor 에이전트 정의 추가 (`.cursor/agents/security-auditor.md`)

### v1.0.0

RFC 5322 기반 이메일 검증 모듈과 사용자 목록 이메일 추출·필터링 유틸을 ES Module로 제공하는 첫 릴리스입니다.

#### ✨ 기능

- **RFC 5322 이메일 검증** — `isValidEmail()`으로 형식 검증 및 RFC 3696 길이 제한(로컬 파트 64자, 전체 254자) 적용
- **이메일 정규화** — `normalizeEmail()`으로 앞뒤 공백 제거 및 소문자 변환
- **사용자 목록 이메일 처리** — `extractEmails()`, `getValidEmails()`로 배열에서 이메일 추출 및 유효한 주소만 필터링
- **공개 API** — `src/index.js`에서 `getValidEmails` export
- **스펙 문서** — [`docs/validator.md`](docs/validator.md)에 검증 규칙·API·테스트 기준 정리

#### 🐛 버그 수정

- 이메일 정규식 IP 옥텟 패턴 개선(잘못된 옥텟 값 허용 문제 수정)

#### 🧹 기타

- CommonJS에서 **ES Module**(`import`/`export`)로 전환
- `node:test` 기반 단위 테스트 추가(`npm test`)
- Cursor 코딩 스타일 규칙 및 릴리스 노트 작성 스킬 추가

## 라이선스

ISC
