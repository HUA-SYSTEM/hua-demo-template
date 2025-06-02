import { useState } from 'react';
import { loadPreset, createSession, sendMessage } from 'hua-sdk-lite';
import React from 'react';
import uiTextKo from './lang/ko';
import uiTextEn from './lang/en';

const tones = ['gentle', 'energetic', 'neutral'] as const;
const modes = ['companion', 'coach', 'listener'] as const;
const tiers = ['F2', 'S1', 'B1'] as const;

const presetLabel: Record<'ko' | 'en', { tone: string; mode: string; tier: string }> = {
  ko: { tone: 'Tone', mode: 'Mode', tier: 'Tier' },
  en: { tone: 'Tone', mode: 'Mode', tier: 'Tier' }
};

const uiText = { ko: uiTextKo, en: uiTextEn };

function App() {
  const [sessionId, setSessionId] = useState<string>('');
  const [sessionUser, setSessionUser] = useState('demo-user');
  const [sessionStatus, setSessionStatus] = useState('');
  const [msgInput, setMsgInput] = useState('');
  const [aiReply, setAiReply] = useState('');
  const [msgLoading, setMsgLoading] = useState(false);
  const [toneDesc, setToneDesc] = useState('');
  const [modeDesc, setModeDesc] = useState('');
  const [tierDesc, setTierDesc] = useState('');
  const [selectedTone, setSelectedTone] = useState('gentle');
  const [selectedMode, setSelectedMode] = useState('companion');
  const [selectedTier, setSelectedTier] = useState('F2');
  const [lang, setLang] = useState<'ko' | 'en'>('ko');

  const handleToneChange = async (tone: string) => {
    setSelectedTone(tone);
    const desc = await loadPreset('tone', tone, lang as import('hua-sdk-lite').SupportedLang);
    setToneDesc(desc);
  };

  const handleModeChange = async (mode: string) => {
    setSelectedMode(mode);
    const desc = await loadPreset('mode', mode, lang as import('hua-sdk-lite').SupportedLang);
    setModeDesc(desc);
  };

  const handleTierChange = async (tier: string) => {
    setSelectedTier(tier);
    const desc = await loadPreset('tier', tier, lang as import('hua-sdk-lite').SupportedLang);
    setTierDesc(desc);
  };

  // lang 변경 시 프리셋 설명도 갱신
  React.useEffect(() => {
    (async () => {
      setToneDesc(await loadPreset('tone', selectedTone, lang as import('hua-sdk-lite').SupportedLang));
      setModeDesc(await loadPreset('mode', selectedMode, lang as import('hua-sdk-lite').SupportedLang));
      setTierDesc(await loadPreset('tier', selectedTier, lang as import('hua-sdk-lite').SupportedLang));
    })();
     
  }, [lang, selectedTone, selectedMode, selectedTier]);

  const handleCreateSession = async () => {
    setSessionStatus('세션 생성 중...');
    setSessionId('');
    setAiReply('');
    try {
      const session = await createSession(sessionUser, {
        tone: selectedTone,
        mode: selectedMode,
        tier: selectedTier,
        lang,
      });
      setSessionId(session.id);
      setSessionStatus(`세션 생성 완료! (ID: ${session.id})`);
    } catch {
      setSessionStatus('세션 생성 실패: API 키 또는 네트워크를 확인하세요.');
    }
  };

  React.useEffect(() => {
    console.log('🔑 Loaded API Key:', import.meta.env.VITE_HUA_API_KEY);
  }, []);

  const handleSendMessage = async () => {
    if (!sessionId) {
      setAiReply(uiText[lang].sessionFail);
      return;
    }
  
    setMsgLoading(true);
    setAiReply(uiText[lang].waiting);
  
    try {
      const reply = await sendMessage(sessionId, msgInput);
      setAiReply(reply);
    } catch (err) {
      console.error('메시지 전송 실패:', err);
      setAiReply(uiText[lang].sendFail);
    }
  
    setMsgLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#18191a',
    }}>
      <div
        style={{
          maxWidth: 540,
          minWidth: 320,
          width: '100%',
          fontFamily: 'sans-serif',
          padding: 36,
          border: '1.5px solid #444',
          borderRadius: 18,
          background: '#232323',
          color: '#f3f3f3',
          boxShadow: '0 4px 24px #0002',
        }}
      >
        {/* 언어 선택 */}
        <div style={{ marginBottom: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
          <label style={{ fontWeight: 600, color: '#b0b8c0' }}>🌐 Language:</label>
          <select value={lang} onChange={e => setLang(e.target.value as 'ko' | 'en')}
            style={{ padding: '4px 12px', borderRadius: 6, border: '1px solid #555', background: '#181818', color: '#fff', fontWeight: 600 }}>
            <option value="ko">한국어</option>
            <option value="en">English</option>
          </select>
        </div>
        <h2 style={{ color: '#7fdfff', marginBottom: 24 }}>{uiText[lang].demoTitle}</h2>

        {/* Tone 라디오 */}
        <div style={{ marginBottom: 10 }}>
          <label style={{ fontWeight: 600, marginRight: 8, color: '#b0b8c0' }}>🎵 {presetLabel[lang].tone}:</label>
          {tones.map(t => (
            <label key={t} style={{ marginRight: 16 }}>
              <input type="radio" name="tone" value={t} checked={selectedTone === t} onChange={() => handleToneChange(t)} /> {t}
            </label>
          ))}
          {toneDesc && <span style={{ marginLeft: 12, color: '#7fdfff', fontSize: 13 }}>({toneDesc})</span>}
        </div>
        {/* Mode 라디오 */}
        <div style={{ marginBottom: 10 }}>
          <label style={{ fontWeight: 600, marginRight: 8, color: '#b0b8c0' }}>🧑‍💼 {presetLabel[lang].mode}:</label>
          {modes.map(m => (
            <label key={m} style={{ marginRight: 16 }}>
              <input type="radio" name="mode" value={m} checked={selectedMode === m} onChange={() => handleModeChange(m)} /> {m}
            </label>
          ))}
          {modeDesc && <span style={{ marginLeft: 12, color: '#7fdfff', fontSize: 13 }}>({modeDesc})</span>}
        </div>
        {/* Tier 라디오 */}
        <div style={{ marginBottom: 18 }}>
          <label style={{ fontWeight: 600, marginRight: 8, color: '#b0b8c0' }}>🏅 {presetLabel[lang].tier}:</label>
          {tiers.map(ti => (
            <label key={ti} style={{ marginRight: 16 }}>
              <input type="radio" name="tier" value={ti} checked={selectedTier === ti} onChange={() => handleTierChange(ti)} /> {ti}
            </label>
          ))}
          {tierDesc && <span style={{ marginLeft: 12, color: '#7fdfff', fontSize: 13 }}>({tierDesc})</span>}
        </div>

        <hr style={{ margin: '32px 0', border: 0, borderTop: '1.5px solid #444' }} />
        <h3 style={{ color: '#ffb347', marginBottom: 12 }}>{uiText[lang].sessionTitle}</h3>
        <div style={{ marginBottom: 12, fontSize: 13, color: '#aaa' }}>
          {uiText[lang].apiNotice}
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>{uiText[lang].userId}: </label>
          <input value={sessionUser} onChange={e => setSessionUser(e.target.value)} style={{ width: 120, marginRight: 8, padding: '6px 10px', borderRadius: 6, border: '1px solid #555', background: '#181818', color: '#fff' }} />
          <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', marginBottom: 16, marginTop: 8, gap: 16 }}>
            <span>
              <span style={{ color: '#b0b8c0', fontWeight: 600, fontSize: 14 }}>{presetLabel[lang].tone}: </span>
              <span style={{ color: '#7fdfff', fontWeight: 700 }}>{selectedTone}</span>
            </span>
            <span>
              <span style={{ color: '#b0b8c0', fontWeight: 600, fontSize: 14 }}>{presetLabel[lang].mode}: </span>
              <span style={{ color: '#7fdfff', fontWeight: 700 }}>{selectedMode}</span>
            </span>
            <span>
              <span style={{ color: '#b0b8c0', fontWeight: 600, fontSize: 14 }}>{presetLabel[lang].tier}: </span>
              <span style={{ color: '#7fdfff', fontWeight: 700 }}>{selectedTier}</span>
            </span>
          </div>
          <button onClick={handleCreateSession} style={{ padding: '6px 16px', borderRadius: 6, border: 'none', background: '#ffb347', color: '#222', fontWeight: 700, cursor: 'pointer' }}>{uiText[lang].createSession}</button>
        </div>
        {sessionStatus && <div style={{ color: sessionId ? '#2a8' : '#c22', marginBottom: 12 }}>{sessionId ? uiText[lang].sessionSuccess(sessionId) : uiText[lang].sessionFail}</div>}
        {sessionId && (
          <div style={{ marginBottom: 12 }}>
            <label>{uiText[lang].msgInput}: </label>
            <input value={msgInput} onChange={e => setMsgInput(e.target.value)} style={{ width: 220, marginRight: 8, padding: '6px 10px', borderRadius: 6, border: '1px solid #555', background: '#181818', color: '#fff' }} placeholder={uiText[lang].msgInput} />
            <button onClick={handleSendMessage} style={{ padding: '6px 16px', borderRadius: 6, border: 'none', background: '#ffb347', color: '#222', fontWeight: 700, cursor: 'pointer' }} disabled={msgLoading}>{uiText[lang].send}</button>
          </div>
        )}
        {aiReply && (
          <div style={{ background: '#2a2a1a', padding: 12, borderRadius: 8, marginBottom: 16, minHeight: 32 }}>
            <b>{uiText[lang].aiReply}</b> {aiReply}
          </div>
        )}
        <div style={{ fontSize: 13, color: '#aaa', marginTop: 32 }}>
          <b>{uiText[lang].presetCustom}</b> {uiText[lang].example}<br />
          {uiText[lang].presetCustomDesc}<br />
        </div>
      </div>
    </div>
  );
}

export default App;
