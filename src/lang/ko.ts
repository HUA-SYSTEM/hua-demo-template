const uiTextKo = {
  demoTitle: '🌏 HUA SDK Lite Demo',
  sessionTitle: '⚡ 3분 완성! 실전 세션/AI 응답 체험',
  apiNotice: '※ API 키는 .env 또는 환경변수(HUA_API_KEY)로 설정되어 있어야 합니다.',
  userId: '사용자 ID',
  createSession: '세션 생성',
  msgInput: '메시지 입력',
  send: '전송',
  aiReply: 'AI 응답:',
  presetCustom: '커스터마이즈 프리셋 적용 예시:',
  presetCustomDesc: 'presets.custom.json 파일을 프로젝트 루트에 두면 해당 key의 프리셋이 override/merge 됩니다.',
  example: '(예: gentle, companion, B1, playful 등)',
  sessionSuccess: (id: string) => `세션 생성 완료! (ID: ${id})`,
  sessionFail: '세션 생성 실패: API 키 또는 네트워크를 확인하세요.',
  msgFail: '메시지 전송 실패: API 키, 세션, 네트워크를 확인하세요.',
  needSession: '먼저 세션을 생성하세요!',
  waiting: 'AI 응답 대기 중...'
};
export default uiTextKo; 