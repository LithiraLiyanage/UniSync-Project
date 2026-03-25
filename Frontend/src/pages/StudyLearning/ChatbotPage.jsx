import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCpu, FiUser, FiZap, FiSun, FiMoon } from 'react-icons/fi';

const suggestedQuestions = [
  "Explain Dijkstra's algorithm simply",
  "How to design a normalized database?",
  "Create a study schedule for finals",
  "Summarize OSI model layers"
];

const mockReplies = [
  "That's a great question! Dijkstra's algorithm finds the shortest path between nodes in a graph. Imagine finding the fastest route on a map.",
  "To normalize a database, you reduce data redundancy and improve data integrity. Start with 1NF (atomic values), then 2NF (remove partial dependencies), and 3NF.",
  "I've analyzed your progress. Since Networks is your weakest module (44%), I recommend dedicating 2 extra hours to it on weekends. I can generate a full calendar if you like.",
  "The OSI model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application. Think of 'Please Do Not Throw Sausage Pizza Away'."
];

// Dark mode accents
const darkAccents = [
  { border: '#4c1d95', bg: 'rgba(109,40,217,0.12)', hoverBorder: '#7c3aed', hoverBg: 'rgba(109,40,217,0.22)', dot: '#a78bfa' },
  { border: '#134e4a', bg: 'rgba(13,148,136,0.12)', hoverBorder: '#0d9488', hoverBg: 'rgba(13,148,136,0.22)', dot: '#2dd4bf' },
  { border: '#831843', bg: 'rgba(219,39,119,0.12)', hoverBorder: '#db2777', hoverBg: 'rgba(219,39,119,0.22)', dot: '#f472b6' },
  { border: '#78350f', bg: 'rgba(217,119,6,0.12)', hoverBorder: '#d97706', hoverBg: 'rgba(217,119,6,0.22)', dot: '#fbbf24' },
];

// Light mode accents — richer, saturated but still readable
const lightAccents = [
  { border: '#c4b5fd', bg: 'rgba(109,40,217,0.07)', hoverBorder: '#7c3aed', hoverBg: 'rgba(109,40,217,0.12)', dot: '#7c3aed' },
  { border: '#99f6e4', bg: 'rgba(13,148,136,0.07)', hoverBorder: '#0d9488', hoverBg: 'rgba(13,148,136,0.12)', dot: '#0d9488' },
  { border: '#fbcfe8', bg: 'rgba(219,39,119,0.07)', hoverBorder: '#db2777', hoverBg: 'rgba(219,39,119,0.12)', dot: '#db2777' },
  { border: '#fde68a', bg: 'rgba(217,119,6,0.07)', hoverBorder: '#d97706', hoverBg: 'rgba(217,119,6,0.12)', dot: '#d97706' },
];

const helpItems = [
  { text: 'Generate study timetables based on your progress.', darkColor: '#a78bfa', lightColor: '#7c3aed' },
  { text: 'Explain complex concepts (DSA, Math).',             darkColor: '#2dd4bf', lightColor: '#0d9488' },
  { text: 'Find relevant past paper questions.',              darkColor: '#f472b6', lightColor: '#db2777' },
  { text: 'Analyze your weak subjects and suggest resources.',darkColor: '#fbbf24', lightColor: '#d97706' },
];

const ChatbotPage = () => {
  const [isDark, setIsDark] = useState(true);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: "Hello! I'm your UniSync AI Study Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [replyIndex, setReplyIndex] = useState(0);
  const [hoveredQ, setHoveredQ] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e, customText = null) => {
    if (e) e.preventDefault();
    const text = customText || input;
    if (!text.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: text.trim() }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: mockReplies[replyIndex % mockReplies.length] }]);
      setReplyIndex(prev => prev + 1);
      setIsTyping(false);
    }, 1500);
  };

  // ── Theme tokens ──────────────────────────────────────────
  const t = isDark ? {
    // backgrounds
    pageBg:        'transparent',
    panelBg:       '#0d0d14',
    panelBorder:   '#1f1b33',
    headerBg:      'linear-gradient(90deg, #110d22 0%, #0d0d14 100%)',
    msgAreaBg:     '#08080f',
    aiBubbleBg:    '#111122',
    aiBubbleBdr:   '#1f1b33',
    aiBubbleClr:   '#d1d5db',
    userBubbleBg:  'linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)',
    userBubbleClr: '#ede9fe',
    userBubbleShadow: '0 4px 18px rgba(109,40,217,0.35)',
    userAvatarBg:  '#1a0f2e',
    userAvatarBdr: '#4c1d95',
    userAvatarClr: '#c4b5fd',
    aiAvatarBg:    'linear-gradient(135deg, #065f46, #0d9488)',
    aiAvatarShadow:'0 0 10px rgba(13,148,136,0.45)',
    headerAvatarBg:'linear-gradient(135deg, #4c1d95, #6d28d9)',
    headerAvatarShadow: '0 0 16px rgba(109,40,217,0.5)',
    titleClr:      '#ede9fe',
    onlineClr:     '#34d399',
    inputBg:       '#08080f',
    inputBdr:      '#2d1f4e',
    inputFocusBdr: '#7c3aed',
    inputClr:      '#e2e8f0',
    sendBg:        'linear-gradient(135deg, #4c1d95, #7c3aed)',
    sendShadow:    '0 2px 12px rgba(124,58,237,0.5)',
    sidebarBg:     '#0d0d14',
    sidebarBdr:    '#1f1b33',
    sidebarTitleClr: '#f3f4f6',
    helpCardBg:    'linear-gradient(135deg, #1a0a1e 0%, #0d0d14 100%)',
    helpCardBdr:   '#3b1054',
    helpDot:       '#f472b6',
    helpTextClr:   '#9ca3af',
    statsCardBg:   'linear-gradient(135deg, #022c22 0%, #0d0d14 100%)',
    statsCardBdr:  '#065f46',
    statsLabelClr: '#6ee7b7',
    statsSubClr:   '#6b7280',
    statsColors:   ['#2dd4bf', '#a78bfa', '#f472b6'],
    typingDotClr:  '#2dd4bf',
    qAccents:      darkAccents,
    qHoverClr:     '#f9fafb',
    qBaseClr:      '#9ca3af',
    toggleBg:      '#1a0f2e',
    toggleBdr:     '#4c1d95',
    toggleClr:     '#c4b5fd',
  } : {
    // backgrounds
    pageBg:        'transparent',
    panelBg:       '#ffffff',
    panelBorder:   '#e5e7eb',
    headerBg:      'linear-gradient(90deg, #f5f3ff 0%, #ffffff 100%)',
    msgAreaBg:     '#f9fafb',
    aiBubbleBg:    '#ffffff',
    aiBubbleBdr:   '#e5e7eb',
    aiBubbleClr:   '#374151',
    userBubbleBg:  'linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)',
    userBubbleClr: '#ffffff',
    userBubbleShadow: '0 4px 18px rgba(109,40,217,0.2)',
    userAvatarBg:  '#ede9fe',
    userAvatarBdr: '#c4b5fd',
    userAvatarClr: '#6d28d9',
    aiAvatarBg:    'linear-gradient(135deg, #065f46, #0d9488)',
    aiAvatarShadow:'0 0 10px rgba(13,148,136,0.3)',
    headerAvatarBg:'linear-gradient(135deg, #6d28d9, #7c3aed)',
    headerAvatarShadow: '0 0 14px rgba(109,40,217,0.3)',
    titleClr:      '#1f2937',
    onlineClr:     '#059669',
    inputBg:       '#f3f4f6',
    inputBdr:      '#d1d5db',
    inputFocusBdr: '#7c3aed',
    inputClr:      '#1f2937',
    sendBg:        'linear-gradient(135deg, #6d28d9, #7c3aed)',
    sendShadow:    '0 2px 10px rgba(109,40,217,0.3)',
    sidebarBg:     '#ffffff',
    sidebarBdr:    '#e5e7eb',
    sidebarTitleClr: '#111827',
    helpCardBg:    'linear-gradient(135deg, #fdf4ff 0%, #ffffff 100%)',
    helpCardBdr:   '#e9d5ff',
    helpDot:       '#db2777',
    helpTextClr:   '#6b7280',
    statsCardBg:   'linear-gradient(135deg, #ecfdf5 0%, #ffffff 100%)',
    statsCardBdr:  '#a7f3d0',
    statsLabelClr: '#059669',
    statsSubClr:   '#9ca3af',
    statsColors:   ['#0d9488', '#7c3aed', '#db2777'],
    typingDotClr:  '#0d9488',
    qAccents:      lightAccents,
    qHoverClr:     '#111827',
    qBaseClr:      '#6b7280',
    toggleBg:      '#fef3c7',
    toggleBdr:     '#fbbf24',
    toggleClr:     '#d97706',
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] min-h-[600px] animate-fade-in pb-10">

      {/* ── Left: Chat Panel ── */}
      <div
        className="flex-1 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={{ background: t.panelBg, border: `1px solid ${t.panelBorder}` }}
      >
        {/* Header */}
        <div
          className="p-4 flex items-center gap-3"
          style={{ background: t.headerBg, borderBottom: `1px solid ${t.panelBorder}` }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ background: t.headerAvatarBg, boxShadow: t.headerAvatarShadow }}
          >
            <FiCpu size={18} color="#fff" />
          </div>
          <div>
            <h2 className="text-base font-bold" style={{ color: t.titleClr }}>UniSync Study AI</h2>
            <p className="text-xs font-semibold flex items-center gap-1.5" style={{ color: t.onlineClr }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: t.onlineClr }} />
              Online
            </p>
          </div>
          {/* Colour dots */}
          <div className="ml-auto flex items-center gap-3">
            <div className="flex gap-1.5">
              {['#7c3aed', '#0d9488', '#db2777', '#d97706'].map(c => (
                <div key={c} className="w-2 h-2 rounded-full" style={{ background: c, opacity: isDark ? 0.8 : 0.6 }} />
              ))}
            </div>
            {/* Toggle button */}
            <button
              onClick={() => setIsDark(d => !d)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all focus:outline-none"
              style={{ background: t.toggleBg, border: `1px solid ${t.toggleBdr}`, color: t.toggleClr }}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <FiSun size={14} /> : <FiMoon size={14} />}
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
          style={{ background: t.msgAreaBg }}
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mb-0.5"
                    style={msg.sender === 'user'
                      ? { background: t.userAvatarBg, border: `1px solid ${t.userAvatarBdr}`, color: t.userAvatarClr }
                      : { background: t.aiAvatarBg, color: '#fff', boxShadow: t.aiAvatarShadow }
                    }
                  >
                    {msg.sender === 'user' ? <FiUser size={13} /> : <FiCpu size={13} />}
                  </div>
                  {/* Bubble */}
                  <div
                    className="p-3.5 rounded-2xl text-sm leading-relaxed"
                    style={msg.sender === 'user'
                      ? { background: t.userBubbleBg, color: t.userBubbleClr, borderTopRightRadius: '4px', boxShadow: t.userBubbleShadow }
                      : { background: t.aiBubbleBg, border: `1px solid ${t.aiBubbleBdr}`, color: t.aiBubbleClr, borderTopLeftRadius: '4px', boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.06)' }
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing dots */}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start items-end gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: t.aiAvatarBg, color: '#fff', boxShadow: t.aiAvatarShadow }}>
                <FiCpu size={13} />
              </div>
              <div className="p-4 rounded-2xl flex gap-1.5 items-center"
                style={{ background: t.aiBubbleBg, border: `1px solid ${t.aiBubbleBdr}`, borderTopLeftRadius: '4px' }}>
                {[0, 150, 300].map(d => (
                  <div key={d} className="w-1.5 h-1.5 rounded-full animate-bounce"
                    style={{ background: t.typingDotClr, animationDelay: `${d}ms` }} />
                ))}
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="p-4" style={{ background: t.panelBg, borderTop: `1px solid ${t.panelBorder}` }}>
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything about your studies..."
              className="w-full pl-5 pr-14 py-3.5 rounded-full focus:outline-none text-sm transition-all"
              style={{ background: t.inputBg, border: `1px solid ${t.inputBdr}`, color: t.inputClr, boxShadow: isDark ? 'inset 0 2px 8px rgba(0,0,0,0.6)' : 'inset 0 2px 4px rgba(0,0,0,0.04)' }}
              onFocus={e => e.target.style.borderColor = t.inputFocusBdr}
              onBlur={e => e.target.style.borderColor = t.inputBdr}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 p-2.5 rounded-full focus:outline-none disabled:opacity-40 transition-all"
              style={{ background: t.sendBg, color: '#fff', boxShadow: t.sendShadow }}
            >
              <FiSend size={15} className="translate-x-0.5 -translate-y-0.5" />
            </button>
          </form>
        </div>
      </div>

      {/* ── Right Sidebar ── */}
      <div className="w-full lg:w-80 flex flex-col gap-5 shrink-0">

        {/* Suggested Questions */}
        <div className="rounded-2xl p-5 shadow-xl" style={{ background: t.sidebarBg, border: `1px solid ${t.sidebarBdr}` }}>
          <h3 className="font-bold mb-4 flex items-center gap-2 text-sm" style={{ color: t.sidebarTitleClr }}>
            <FiZap style={{ color: '#f59e0b' }} /> Suggested Questions
          </h3>
          <div className="space-y-2">
            {suggestedQuestions.map((q, i) => {
              const a = t.qAccents[i % t.qAccents.length];
              const isHov = hoveredQ === i;
              return (
                <button
                  key={i}
                  onClick={() => handleSend(null, q)}
                  disabled={isTyping}
                  onMouseEnter={() => setHoveredQ(i)}
                  onMouseLeave={() => setHoveredQ(null)}
                  className="w-full text-left p-3 rounded-xl transition-all focus:outline-none text-sm flex items-center gap-2.5"
                  style={{
                    background: isHov ? a.hoverBg : a.bg,
                    border: `1px solid ${isHov ? a.hoverBorder : a.border}`,
                    color: isHov ? t.qHoverClr : t.qBaseClr,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: a.dot }} />
                  {q}
                </button>
              );
            })}
          </div>
        </div>

        {/* How I can help */}
        <div className="rounded-2xl p-5" style={{ background: t.helpCardBg, border: `1px solid ${t.helpCardBdr}` }}>
          <h3 className="font-bold mb-3 text-sm flex items-center gap-2" style={{ color: t.sidebarTitleClr }}>
            <span className="w-2 h-2 rounded-full" style={{ background: t.helpDot }} />
            How I can help?
          </h3>
          <ul className="space-y-2.5 text-xs pl-1">
            {helpItems.map((item, i) => (
              <li key={i} className="flex items-start gap-2" style={{ color: t.helpTextClr }}>
                <span className="w-1.5 h-1.5 rounded-full mt-1 shrink-0"
                  style={{ background: isDark ? item.darkColor : item.lightColor }} />
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Session Stats */}
        <div className="rounded-2xl p-4" style={{ background: t.statsCardBg, border: `1px solid ${t.statsCardBdr}` }}>
          <p className="text-xs font-semibold mb-3" style={{ color: t.statsLabelClr }}>Session Stats</p>
          <div className="flex justify-between text-center">
            {[
              { label: 'Questions', val: messages.filter(m => m.sender === 'user').length },
              { label: 'Answers',   val: Math.max(0, messages.filter(m => m.sender === 'ai').length - 1) },
              { label: 'Topics',    val: Math.max(1, Math.floor(messages.length / 2)) },
            ].map((s, i) => (
              <div key={s.label}>
                <p className="text-xl font-bold" style={{ color: t.statsColors[i] }}>{s.val}</p>
                <p className="text-xs" style={{ color: t.statsSubClr }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatbotPage;
