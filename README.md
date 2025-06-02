# HUA SDK Lite Demo

🌏 Vite + React + TypeScript 기반의 경량 AI 세션/프리셋 체험 데모

## 주요 특징

- HUA SDK Lite 연동: 실전 프리셋(tone/mode/tier) 구조, 세션 생성, 메시지 전송, 다국어(i18n) 지원
- 한/영 언어 전환, 프리셋 설명, UX 최적화(모던 UI, 반응형, 다크모드)
- 커스터마이즈 프리셋 적용 예시 및 실전 서비스 구조
- 자동화 스크립트(scripts/commit-push.bat)로 커밋/푸시 간편화(윈도우)

## 설치 및 실행

```bash
npm install
npm run dev
```

- `.env` 또는 환경변수에 `HUA_API_KEY`를 설정해야 실제 API 연동이 가능합니다.

## 사용법

- Tone/Mode/Tier 프리셋을 선택하고, 사용자 ID로 세션을 생성
- 메시지를 입력하면 AI 감응 응답을 실시간으로 체험
- 언어(한/영) 전환, 프리셋 설명, 커스터마이즈 프리셋 등 다양한 기능 제공

## 다국어 안내 메시지(i18n)

- 모든 안내 메시지(응답 대기중, 에러 등)는 언어별 리소스(en/ko)에서 동적으로 불러옵니다.
- 세션 생성 시 선택한 언어(lang)가 API로 전달되어, 서버가 지원할 경우 다국어 응답이 가능합니다.

## 테스트/마스터 API 키

- is_test=true로 발급된 API 키는 usage 제한 없이 무제한 호출이 가능합니다.

## 자동화 스크립트

- `scripts/commit-push.bat` 실행 시 커밋 메시지 입력 → 자동 커밋/푸시

## 관련 프로젝트

- [HUA SDK Lite (메인 SDK)](https://github.com/HUA-Labs/hua-sdk-lite)

## 라이선스

MIT
