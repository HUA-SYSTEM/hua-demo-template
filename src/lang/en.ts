const uiTextEn = {
  demoTitle: '🌏 HUA SDK Lite Demo',
  sessionTitle: '⚡ 3-min Quickstart! Real Session/AI Demo',
  apiNotice: '※ API key must be set in .env or environment variable (HUA_API_KEY).',
  userId: 'User ID',
  createSession: 'Create Session',
  msgInput: 'Message Input',
  send: 'Send',
  aiReply: 'AI Reply:',
  presetCustom: 'Custom Preset Example:',
  presetCustomDesc: 'Place presets.custom.json in project root to override/merge keys.',
  example: '(e.g. gentle, companion, B1, playful)',
  sessionSuccess: (id: string) => `Session created! (ID: ${id})`,
  sessionFail: 'Please create a session first!',
  msgFail: 'Message failed: Check API key, session, or network.',
  needSession: 'Create a session first!',
  waiting: 'Waiting for AI reply...',
  sendFail: 'AI Reply: Message send failed. Please check your API key, session, or network.'
};
export default uiTextEn; 