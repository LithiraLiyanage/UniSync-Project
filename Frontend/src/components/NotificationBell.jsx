import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const ICONS = {
  new_service: '🛒',
  new_order:   '📦',
  order_update:'📋',
  new_message: '💬',
  new_report:  '🚩',
};

function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);
  if (diff < 60)   return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function NotificationBell() {
  const [open,         setOpen]         = useState(false);
  const [notifications,setNotifications]= useState([]);
  const [unreadCount,  setUnreadCount]  = useState(0);
  const [loading,      setLoading]      = useState(false);
  const ref  = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    try {
      const { data } = await api.get('/notifications');
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      console.error('Notifications fetch error:', err.message);
    }
  }, []);

  // Poll every 15 seconds for new notifications
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // When opening the dropdown, mark all as read
  const handleOpen = async () => {
    const wasOpen = open;
    setOpen(v => !v);
    if (!wasOpen && unreadCount > 0) {
      try {
        await api.put('/notifications/read-all');
        setUnreadCount(0);
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      } catch {}
    }
  };

  const deleteOne = async (e, id) => {
    e.stopPropagation();
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n._id !== id));
    } catch {}
  };

  const clearAll = async () => {
    try {
      await api.delete('/notifications');
      setNotifications([]);
      setUnreadCount(0);
    } catch {}
  };

  const handleClick = (notif) => {
    if (notif.link) {
      navigate(notif.link);
      setOpen(false);
    }
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Bell button */}
      <button
        onClick={handleOpen}
        style={{
          width: 36, height: 36,
          background: 'var(--inp-bg)',
          borderRadius: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          border: '1px solid var(--border)',
          position: 'relative',
          color: 'var(--muted)',
          transition: 'all 0.15s',
        }}
      >
        <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
        </svg>

        {/* Unread badge */}
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute', top: -4, right: -4,
            minWidth: 18, height: 18,
            background: 'var(--red)',
            borderRadius: '50%',
            fontSize: 10, fontWeight: 700,
            color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid var(--bg)',
            padding: '0 3px',
            fontFamily: "'Sora', sans-serif",
          }}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          width: 320,
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          boxShadow: '0 16px 48px rgba(0,0,0,0.25)',
          zIndex: 200,
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px',
            borderBottom: '1px solid var(--border)',
          }}>
            <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 14, color: 'var(--text2)' }}>
              Notifications
            </span>
            {notifications.length > 0 && (
              <button onClick={clearAll} style={{
                fontSize: 12, color: 'var(--red)',
                background: 'none', border: 'none',
                cursor: 'pointer', fontFamily: 'inherit',
                padding: '2px 6px', borderRadius: 6,
              }}>
                Clear all
              </button>
            )}
          </div>

          {/* List */}
          <div style={{ maxHeight: 380, overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <div style={{
                padding: '40px 20px', textAlign: 'center',
                color: 'var(--muted)', fontSize: 13,
              }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🔔</div>
                No notifications yet
              </div>
            ) : (
              notifications.map(n => (
                <div
                  key={n._id}
                  onClick={() => handleClick(n)}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--border)',
                    cursor: n.link ? 'pointer' : 'default',
                    background: n.isRead ? 'transparent' : 'rgba(91,141,239,0.04)',
                    transition: 'background 0.15s',
                    position: 'relative',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--hover-bg)'}
                  onMouseLeave={e => e.currentTarget.style.background = n.isRead ? 'transparent' : 'rgba(91,141,239,0.04)'}
                >
                  {/* Unread dot */}
                  {!n.isRead && (
                    <div style={{
                      position: 'absolute', left: 6, top: '50%',
                      transform: 'translateY(-50%)',
                      width: 6, height: 6,
                      borderRadius: '50%',
                      background: 'var(--p)',
                    }} />
                  )}

                  {/* Icon */}
                  <div style={{
                    width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                    background: 'var(--card2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16,
                  }}>
                    {ICONS[n.type] || '🔔'}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 13, fontWeight: 600,
                      color: 'var(--text)',
                      marginBottom: 2,
                    }}>
                      {n.title}
                    </div>
                    <div style={{
                      fontSize: 12, color: 'var(--muted)',
                      lineHeight: 1.4,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {n.body}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>
                      {timeAgo(n.createdAt)}
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={(e) => deleteOne(e, n._id)}
                    style={{
                      width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--muted)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      opacity: 0.5, transition: 'opacity 0.15s',
                      fontSize: 14,
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '0.5'}
                    title="Delete notification"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div style={{
              padding: '10px 16px',
              borderTop: '1px solid var(--border)',
              textAlign: 'center',
              fontSize: 12, color: 'var(--muted)',
            }}>
              {notifications.length} notification{notifications.length !== 1 ? 's' : ''} total
            </div>
          )}
        </div>
      )}
    </div>
  );
}
