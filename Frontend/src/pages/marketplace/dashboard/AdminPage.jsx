import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../../utils/api';
import useAuth from '../../../utils/useAuth';
import { Button, Avatar, Card, EmptyState } from '../../../components/UI';

export default function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.role !== 'admin') { navigate('/earn'); return; }
    
    setLoading(true);
    api.get('/api/admin/users')
      .then(r => setAdmins(r.data))
      .catch(() => toast.error('Failed to load admins'))
      .finally(() => setLoading(false));
  }, [navigate, user]);

  const handleMessageUser = async (u) => {
    try {
      if (u._id === user?._id) return;
      await api.post('/api/messages', { recipientId: u._id });
      navigate('/earn/messages');
      toast.success('Conversation opened');
    } catch { toast.error('Failed to open conversation'); }
  };

  return (
    <div className="animate-up">
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 24, color: 'var(--text2)' }}>
            Admin Panel
          </h1>
          <span style={{
            padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
            background: 'rgba(242,92,92,0.12)', color: 'var(--red)',
          }}>ADMIN</span>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>Manage registered administrators</p>
      </div>

      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 16, color: 'var(--text2)' }}>Registered Admins</h2>
        </div>
        
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center' }}><span className="spinner" /></div>
        ) : admins.length === 0 ? (
          <EmptyState icon="👥" title="No admins" subtitle="No admins registered yet" />
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--card2)' }}>
                {['Name', 'Email', 'Joined', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11.5, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {admins.map(u => (
                <tr key={u._id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar initials={u.initials || '?'} size={30} />
                      <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)' }}>
                        {u.name} {user && u._id === user._id && <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(You)</span>}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--muted)' }}>{u.email}</td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {user && u._id !== user._id ? (
                      <Button size="sm" variant="secondary" onClick={() => handleMessageUser(u)}>
                        Message
                      </Button>
                    ) : (
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}

