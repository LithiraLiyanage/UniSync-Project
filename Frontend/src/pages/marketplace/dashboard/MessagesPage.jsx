import React, { useEffect, useState, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../../../utils/api';
import useAuth from '../../../utils/useAuth';
import { Avatar, EmptyState } from '../../../components/UI';

export default function MessagesPage() {
  const { user } = useAuth();
  const [convos, setConvos] = useState([]);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);

  const fetchConvos = async () => {
    try {
      const { data } = await api.get('/api/messages');
      setConvos(data);
      if (data.length && !active) setActive(data[0]);
    } catch {
      toast.error('Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = useCallback(async () => {
    if (!active?._id) return;
    try {
      const { data } = await api.get(`/api/messages/${active._id}`);
      setMessages(data.messages || []);
    } catch {}
  }, [active?._id]);

  useEffect(() => { fetchConvos(); }, []);
  useEffect(() => { fetchMessages(); }, [fetchMessages]);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages]);

  const getOther = (convo) =>
    convo.participants?.find(p => p._id !== user?._id) || convo.participants?.[0];

  const send = async () => {
    if (!text.trim() || !active) return;
    setSending(true);
    try {
      const { data: msg } = await api.post(`/api/messages/${active._id}/send`, { content: text.trim() });
      setMessages(prev => [...prev, msg]);
      setText('');
      // update last message in sidebar
      setConvos(prev => prev.map(c =>
        c._id === active._id ? { ...c, lastMessage: msg.content, lastMessageAt: msg.createdAt } : c
      ));
    } catch {
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const deleteMsg = async (msgId) => {
    try {
      await api.delete(`/api/messages/${active._id}/messages/${msgId}`);
      setMessages(prev => prev.filter(m => m._id !== msgId));
      toast.success('Message deleted');
    } catch {
      toast.error('Failed to delete message');
    }
  };

  const deleteChat = async () => {
    if (!window.confirm("Are you sure you want to delete this entire chat?")) return;
    try {
      await api.delete(`/api/messages/${active._id}`);
      setConvos(prev => prev.filter(c => c._id !== active._id));
      setActive(null);
      setMessages([]);
      toast.success('Chat deleted');
    } catch {
      toast.error('Failed to delete chat');
    }
  };


  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const fmtTime = (d) => new Date(d).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });

  return (
    <div className="animate-up">
      <div style={{ marginBottom:16 }}>
        <h1 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:24, color:'var(--text2)' }}>Messages</h1>
      </div>

      <div style={{
        display:'flex', background:'var(--card)', border:'1px solid var(--border)',
        borderRadius:20, overflow:'hidden', height:'calc(100vh - 200px)',
      }}>

        {/* Conversation list */}
        <div style={{
          width:260, borderRight:'1px solid var(--border)',
          display:'flex', flexDirection:'column', flexShrink:0,
        }}>
          <div style={{
            padding:'14px 16px', borderBottom:'1px solid var(--border)',
            fontWeight:700, fontSize:14, color:'var(--text2)',
          }}>
            Conversations
          </div>

          <div style={{ flex:1, overflowY:'auto' }}>
            {loading ? (
              <div style={{ padding:32, textAlign:'center' }}><span className="spinner" /></div>
            ) : convos.length === 0 ? (
              <div style={{ padding:24, textAlign:'center', color:'var(--muted)', fontSize:13 }}>
                No conversations yet.<br />Place an order to start chatting!
              </div>
            ) : convos.map(c => {
              const other = getOther(c);
              const isActive = active?._id === c._id;
              return (
                <div key={c._id} onClick={() => setActive(c)} style={{
                  display:'flex', alignItems:'center', gap:12,
                  padding:'12px 16px', cursor:'pointer',
                  background: isActive ? 'rgba(91,141,239,0.08)' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--p)' : '3px solid transparent',
                  transition:'all 0.15s',
                }}>
                  <Avatar initials={other?.initials || '?'} size={36} />
                  <div style={{ flex:1, overflow:'hidden' }}>
                    <div style={{ fontWeight:600, fontSize:13, color:'var(--text)', marginBottom:2 }}>
                      {other?.firstName} {other?.lastName}
                    </div>
                    <div style={{ fontSize:12, color:'var(--muted)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                      {c.lastMessage || 'No messages yet'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat main */}
        {!active ? (
          <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <EmptyState icon="💬" title="Select a conversation" subtitle="Choose a conversation from the left to start chatting" />
          </div>
        ) : (
          <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
            {/* Header */}
            <div style={{
              padding:'14px 20px', borderBottom:'1px solid var(--border)',
              display:'flex', alignItems:'center', gap:12,
            }}>
              <Avatar initials={getOther(active)?.initials || '?'} size={32} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight:700, fontSize:14, color:'var(--text2)' }}>
                  {getOther(active)?.firstName} {getOther(active)?.lastName}
                </div>
                <div style={{ fontSize:12, color:'var(--muted)' }}>
                  {active.order ? 'Order conversation' : 'Direct message'}
                </div>
              </div>
              <button
                onClick={deleteChat}
                style={{
                  padding: '6px 12px',
                  borderRadius: 8,
                  border: 'none',
                  background: 'var(--red)',
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Delete Chat
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex:1, overflowY:'auto', padding:'20px 20px',
              display:'flex', flexDirection:'column', gap:12,
              background:'var(--bg)',
            }}>
              {messages.length === 0 ? (
                <div style={{ textAlign:'center', color:'var(--muted)', fontSize:13, marginTop:40 }}>
                  No messages yet. Say hello! 👋
                </div>
              ) : messages.map(m => {
                const isMine = m.sender?._id === user?._id || m.sender === user?._id;
                return (
                  <div key={m._id} style={{
                    display:'flex', flexDirection:'column',
                    alignItems: isMine ? 'flex-end' : 'flex-start',
                  }}>
                    {!isMine && (
                      <span style={{ fontSize:11.5, color:'var(--muted)', marginBottom:4 }}>
                        {m.sender?.firstName} {m.sender?.lastName}
                      </span>
                    )}
                    <div style={{ position:'relative', maxWidth:'72%' }}
                      onMouseEnter={e => { e.currentTarget.querySelector('.del-btn')?.style && (e.currentTarget.querySelector('.del-btn').style.opacity='1'); }}
                      onMouseLeave={e => { e.currentTarget.querySelector('.del-btn')?.style && (e.currentTarget.querySelector('.del-btn').style.opacity='0'); }}
                    >
                      <div style={{
                        padding:'10px 14px', borderRadius: isMine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        background: isMine ? 'linear-gradient(135deg,var(--p),var(--p2))' : 'var(--card2)',
                        color: isMine ? '#fff' : 'var(--text)',
                        fontSize:14, lineHeight:1.5,
                        border: isMine ? 'none' : '1px solid var(--border)',
                      }}>
                        {m.content}
                      </div>
                      <button
                        className="del-btn"
                        onClick={() => deleteMsg(m._id)}
                        style={{
                          position:'absolute', top:-8, right:-8,
                          width:20, height:20, borderRadius:'50%',
                          background:'var(--red)', border:'none',
                          color:'#fff', cursor:'pointer', fontSize:10,
                          display:'flex', alignItems:'center', justifyContent:'center',
                          opacity:0, transition:'opacity 0.15s',
                        }}
                      >✕</button>
                    </div>
                    <span style={{ fontSize:11, color:'var(--muted)', marginTop:4 }}>
                      {fmtTime(m.createdAt)}
                    </span>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{
              padding:'14px 20px', borderTop:'1px solid var(--border)',
              display:'flex', gap:10, alignItems:'flex-end',
              background:'var(--card)',
            }}>
              <textarea
                value={text} onChange={e => setText(e.target.value)} onKeyDown={handleKey}
                placeholder="Type a message… (Enter to send)"
                rows={1}
                style={{
                  flex:1, padding:'10px 14px', borderRadius:12,
                  border:'1.5px solid var(--inp-border)', background:'var(--inp-bg)',
                  color:'var(--text)', fontSize:14, fontFamily:'inherit',
                  outline:'none', resize:'none', lineHeight:1.5,
                }}
              />
              <button onClick={send} disabled={sending || !text.trim()} style={{
                width:40, height:40, borderRadius:12, flexShrink:0,
                background: 'linear-gradient(135deg,var(--p),var(--p2))',
                border:'none', cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'center',
                opacity: sending || !text.trim() ? 0.5 : 1,
                transition:'all 0.2s',
              }}>
                <svg width="16" height="16" fill="none" stroke="#fff" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
