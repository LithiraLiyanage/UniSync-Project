import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../../utils/api';
import useAuth from '../../../utils/useAuth';
import { Button, Modal, Textarea, Avatar, Card, EmptyState } from '../../../components/UI';

const TABS = ['Reports', 'Services', 'Users'];

const STATUS_COLOR = {
  pending:   'var(--acc)',
  reviewed:  'var(--p)',
  resolved:  'var(--green)',
  dismissed: 'var(--muted)',
};

export default function AdminPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [stats, setStats] = useState(null);

  // Reports
  const [reports, setReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [reviewModal, setReviewModal] = useState(null);
  const [adminNote, setAdminNote] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);

  // Services
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Users
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  useEffect(() => {
    if (user?.role !== 'admin') { navigate('/earn'); return; }
    api.get('/api/admin/stats').then(r => setStats(r.data)).catch(() => {});
  }, []);

  // Fetch reports
  const fetchReports = useCallback(async () => {
    setReportsLoading(true);
    try {
      const params = statusFilter !== 'all' ? `?status=${statusFilter}` : '';
      const { data } = await api.get(`/api/admin/reports${params}`);
      setReports(data);
    } catch { toast.error('Failed to load reports'); }
    finally { setReportsLoading(false); }
  }, [statusFilter]);

  useEffect(() => { if (tab === 0) fetchReports(); }, [tab, fetchReports]);

  // Fetch services
  useEffect(() => {
    if (tab !== 1) return;
    setServicesLoading(true);
    api.get('/api/admin/services')
      .then(r => setServices(r.data))
      .catch(() => toast.error('Failed to load services'))
      .finally(() => setServicesLoading(false));
  }, [tab]);

  // Fetch users
  useEffect(() => {
    if (tab !== 2) return;
    setUsersLoading(true);
    api.get('/api/admin/users')
      .then(r => setUsers(r.data))
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setUsersLoading(false));
  }, [tab]);

  // Update report status
  const handleReview = async (status) => {
    setReviewLoading(true);
    try {
      const { data } = await api.put(`/api/admin/reports/${reviewModal._id}`, { status, adminNote });
      setReports(prev => prev.map(r => r._id === data._id ? data : r));
      toast.success(`Report marked as ${status}`);
      setReviewModal(null);
      setAdminNote('');
      api.get('/api/admin/stats').then(r => setStats(r.data)).catch(() => {});
    } catch { toast.error('Failed to update report'); }
    finally { setReviewLoading(false); }
  };

  // Admin delete service
  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await api.delete(`/api/admin/services/${deleteTarget._id}`);
      setServices(prev => prev.filter(s => s._id !== deleteTarget._id));
      toast.success('Service removed');
      setDeleteTarget(null);
    } catch { toast.error('Failed to remove service'); }
    finally { setDeleteLoading(false); }
  };

  // Suspend / activate user
  const handleSuspend = async (u) => {
    try {
      const { data } = await api.put(`/api/admin/users/${u._id}/suspend`);
      setUsers(prev => prev.map(x => x._id === u._id ? { ...x, isActive: data.isActive } : x));
      toast.success(data.message);
    } catch { toast.error('Failed to update user'); }
  };

  // Message user
  const handleMessageUser = async (u) => {
    try {
      const { data } = await api.post('/api/messages', { recipientId: u._id });
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
        <p style={{ color: 'var(--muted)', fontSize: 14 }}>Manage reports, services, and users</p>
      </div>

      {/* Stats cards */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '👥', label: 'Total Students', value: stats.totalUsers, color: 'rgba(91,141,239,0.3)' },
            { icon: '🛍️', label: 'Active Services', value: stats.totalServices, color: 'rgba(34,211,160,0.3)' },
            { icon: '📦', label: 'Total Orders', value: stats.totalOrders, color: 'rgba(244,185,66,0.3)' },
            { icon: '🚨', label: 'Pending Reports', value: stats.pendingReports, color: 'rgba(242,92,92,0.3)' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 18,
              padding: 20, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, right: 0, width: 80, height: 80,
                borderRadius: '50%', background: s.color, opacity: 0.4,
                transform: 'translate(20%, -20%)',
              }} />
              <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 26, color: 'var(--text2)' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: 'var(--card2)', padding: 4, borderRadius: 14, width: 'fit-content' }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{
            padding: '8px 22px', borderRadius: 10, fontSize: 13, fontWeight: 600,
            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            background: tab === i ? 'var(--p)' : 'transparent',
            color: tab === i ? '#fff' : 'var(--muted)',
            transition: 'all 0.15s',
          }}>{t}</button>
        ))}
      </div>

      {/* ── REPORTS TAB ──────────────────────────────────────────────── */}
      {tab === 0 && (
        <div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
            {['all', 'pending', 'reviewed', 'resolved', 'dismissed'].map(s => (
              <button key={s} onClick={() => setStatusFilter(s)} style={{
                padding: '6px 14px', borderRadius: 10, fontSize: 12, fontWeight: 600,
                border: '1.5px solid',
                borderColor: statusFilter === s ? 'var(--p)' : 'var(--border)',
                background: statusFilter === s ? 'rgba(91,141,239,0.1)' : 'var(--inp-bg)',
                color: statusFilter === s ? 'var(--p)' : 'var(--muted)',
                cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize',
              }}>{s}</button>
            ))}
          </div>

          <Card style={{ padding: 0, overflow: 'hidden' }}>
            {reportsLoading ? (
              <div style={{ padding: 48, textAlign: 'center' }}><span className="spinner" /></div>
            ) : reports.length === 0 ? (
              <EmptyState icon="✅" title="No reports" subtitle="No reports match this filter" />
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--card2)' }}>
                    {['Service', 'Reported By', 'Reason', 'Date', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11.5, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reports.map(r => (
                    <tr key={r._id} style={{ borderTop: '1px solid var(--border)' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)' }}>{r.service?.title || 'Deleted'}</div>
                        <div style={{ fontSize: 11, color: 'var(--muted)' }}>{r.service?.category}</div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Avatar initials={r.reportedBy?.initials || '?'} size={26} />
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{r.reportedBy?.name}</div>
                            <div style={{ fontSize: 11, color: 'var(--muted)' }}>{r.reportedBy?.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--text)' }}>{r.reason}</td>
                      <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{new Date(r.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          padding: '3px 10px', borderRadius: 20, fontSize: 11.5, fontWeight: 700,
                          background: `${STATUS_COLOR[r.status]}22`, color: STATUS_COLOR[r.status],
                          textTransform: 'capitalize',
                        }}>{r.status}</span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <Button size="sm" variant="secondary"
                          onClick={() => { setReviewModal(r); setAdminNote(r.adminNote || ''); }}>
                          Review
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </div>
      )}

      {/* ── SERVICES TAB ─────────────────────────────────────────────── */}
      {tab === 1 && (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {servicesLoading ? (
            <div style={{ padding: 48, textAlign: 'center' }}><span className="spinner" /></div>
          ) : services.length === 0 ? (
            <EmptyState icon="🛍️" title="No services" subtitle="No services in the system yet" />
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--card2)' }}>
                  {['Service', 'Seller', 'Category', 'Price', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11.5, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.map(s => (
                  <tr key={s._id} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.title}</div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Avatar initials={s.seller?.initials || '?'} size={26} />
                        <span style={{ fontSize: 13, color: 'var(--text)' }}>{s.seller?.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--muted)' }}>{s.category}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 700, color: 'var(--p)' }}>Rs.{s.price}/=</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: 20, fontSize: 11.5, fontWeight: 700,
                        background: s.isActive ? 'rgba(34,211,160,0.12)' : 'rgba(242,92,92,0.12)',
                        color: s.isActive ? 'var(--green)' : 'var(--red)',
                      }}>{s.isActive ? 'Active' : 'Removed'}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <Button size="sm" variant="secondary"
                          onClick={() => handleMessageUser(s.seller)}>
                          Message
                        </Button>
                        {s.isActive && (
                          <Button size="sm" variant="danger" onClick={() => setDeleteTarget(s)}>
                            Remove
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      )}

      {/* ── USERS TAB ────────────────────────────────────────────────── */}
      {tab === 2 && (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {usersLoading ? (
            <div style={{ padding: 48, textAlign: 'center' }}><span className="spinner" /></div>
          ) : users.length === 0 ? (
            <EmptyState icon="👥" title="No users" subtitle="No students registered yet" />
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--card2)' }}>
                  {['User', 'Email', 'University', 'Balance', 'Status', 'Joined', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11.5, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} style={{ borderTop: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Avatar initials={u.initials || '?'} size={30} />
                        <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)' }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--muted)' }}>{u.email}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, color: 'var(--muted)' }}>{u.university || '—'}</td>
                    <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: 'var(--p)' }}>Rs.{u.walletBalance?.toFixed(2)}/=</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: 20, fontSize: 11.5, fontWeight: 700,
                        background: u.isActive ? 'rgba(34,211,160,0.12)' : 'rgba(242,92,92,0.12)',
                        color: u.isActive ? 'var(--green)' : 'var(--red)',
                      }}>{u.isActive ? 'Active' : 'Suspended'}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <Button size="sm" variant="secondary" onClick={() => handleMessageUser(u)}>
                          Message
                        </Button>
                        <Button size="sm" variant={u.isActive ? 'danger' : 'secondary'} onClick={() => handleSuspend(u)}>
                          {u.isActive ? 'Suspend' : 'Activate'}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      )}

      {/* ── REVIEW REPORT MODAL ──────────────────────────────────────── */}
      <Modal open={!!reviewModal} onClose={() => { setReviewModal(null); setAdminNote(''); }}
        title="Review Report" width={500}>
        {reviewModal && (
          <div>
            <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
              {[
                { label: 'Service', value: reviewModal.service?.title || 'Deleted' },
                { label: 'Reason', value: reviewModal.reason },
                { label: 'Reported by', value: `${reviewModal.reportedBy?.name}` },
                { label: 'Details', value: reviewModal.details || '—' },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', gap: 12, padding: '10px 14px', background: 'var(--card2)', borderRadius: 10 }}>
                  <span style={{ fontSize: 13, color: 'var(--muted)', width: 90, flexShrink: 0 }}>{row.label}</span>
                  <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{row.value}</span>
                </div>
              ))}
            </div>
            <Textarea
              label="Admin Note (optional)"
              placeholder="Add a note about your decision..."
              value={adminNote}
              onChange={e => setAdminNote(e.target.value)}
              rows={3}
            />
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
              <Button size="sm" variant="secondary" loading={reviewLoading} onClick={() => handleReview('reviewed')}>Mark Reviewed</Button>
              <Button size="sm" variant="primary" loading={reviewLoading} onClick={() => handleReview('resolved')}>Mark Resolved</Button>
              <Button size="sm" variant="ghost" loading={reviewLoading} onClick={() => handleReview('dismissed')}>Dismiss</Button>
              <div style={{ marginLeft: 'auto' }}>
                <Button size="sm" variant="danger" loading={reviewLoading}
                  onClick={async () => {
                    try {
                      await api.delete(`/api/admin/services/${reviewModal.service?._id}`);
                      await handleReview('resolved');
                      toast.success('Service removed and report resolved');
                    } catch { toast.error('Failed'); }
                  }}>
                  Remove Service
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* ── ADMIN DELETE MODAL ───────────────────────────────────────── */}
      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Remove Service" width={400}>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>
          Remove <strong style={{ color: 'var(--text)' }}>{deleteTarget?.title}</strong>? This will hide it from all users.
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="secondary" fullWidth onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" fullWidth loading={deleteLoading} onClick={handleDelete}>Remove</Button>
        </div>
      </Modal>
    </div>
  );
}
