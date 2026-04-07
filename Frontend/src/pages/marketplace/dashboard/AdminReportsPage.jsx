import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../../utils/api';
import useAuth from '../../utils/useAuth';
import { Button, Modal, Textarea, EmptyState, Card } from '../../components/UI';

const STATUS_COLOR = {
  pending:   'var(--acc)',
  reviewed:  'var(--p)',
  resolved:  'var(--green)',
  dismissed: 'var(--muted)',
};

const REASON_LABEL = {
  spam:          'Spam',
  inappropriate: 'Inappropriate',
  misleading:    'Misleading',
  scam:          'Scam / Fraud',
  other:         'Other',
};

export default function AdminReportsPage() {
  const [reports,      setReports]      = useState([]);
  const [stats,        setStats]        = useState(null);
  const [loading,      setLoading]      = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected,     setSelected]     = useState(null);
  const [adminNote,    setAdminNote]     = useState('');
  const [acting,       setActing]        = useState(false);

  // ── Fetch admin stats ──────────────────────────────────────────────
  const fetchStats = async () => {
    try {
      const { data } = await api.get('/admin/stats');
      setStats(data);
    } catch (err) {
      console.error('Stats error:', err.response?.data?.message || err.message);
    }
  };

  // ── Fetch reports ──────────────────────────────────────────────────
  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      const { data } = await api.get(`/admin/reports?${params}`);
      // admin/reports returns array directly
      setReports(Array.isArray(data) ? data : (data.reports || []));
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      console.error('[AdminReports] fetch error:', err.response?.status, msg);
      toast.error('Failed to load reports: ' + msg);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // ── Update report status ───────────────────────────────────────────
  const updateStatus = async (reportId, status) => {
    setActing(true);
    try {
      const { data } = await api.put(`/admin/reports/${reportId}`, { status, adminNote });
      setReports(prev => prev.map(r => r._id === reportId ? data : r));
      toast.success('Report updated to: ' + status);
      setSelected(null);
      setAdminNote('');
      fetchStats();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update');
    } finally {
      setActing(false);
    }
  };

  // ── Remove reported service ────────────────────────────────────────
  const removeService = async (report) => {
    setActing(true);
    try {
      await api.delete(`/admin/services/${report.service?._id}`);
      toast.success('Service removed successfully');
      fetchReports();
      fetchStats();
      setSelected(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove service');
    } finally {
      setActing(false);
    }
  };

  const pendingCount   = reports.filter(r => r.status === 'pending').length;
  const resolvedCount  = reports.filter(r => r.status === 'resolved').length;
  const dismissedCount = reports.filter(r => r.status === 'dismissed').length;

  return (
    <div className="animate-up">

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 24, color: 'var(--text2)' }}>
          👑 Admin Dashboard
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>
          Manage reports, users and services
        </p>
      </div>

      {/* Platform stats from /admin/stats */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
          {[
            { label: 'Total Students',   value: stats.totalUsers,      icon: '🎓', color: 'var(--p)'     },
            { label: 'Active Services',  value: stats.totalServices,   icon: '🛒', color: 'var(--green)' },
            { label: 'Total Orders',     value: stats.totalOrders,     icon: '📦', color: 'var(--purple)' },
            { label: 'Pending Reports',  value: stats.pendingReports,  icon: '🚩', color: 'var(--red)'   },
          ].map(s => (
            <Card key={s.label} style={{ padding: '18px 20px' }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 26, color: s.color, marginTop: 6 }}>
                {s.value ?? '—'}
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 2 }}>{s.label}</div>
            </Card>
          ))}
        </div>
      )}

      {/* Reports section */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 18, color: 'var(--text2)', marginBottom: 4 }}>
          Service Reports
        </h2>

        {/* Report counts */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          {[
            { label: 'Pending',   value: pendingCount,   color: 'var(--acc)'   },
            { label: 'Resolved',  value: resolvedCount,  color: 'var(--green)' },
            { label: 'Dismissed', value: dismissedCount, color: 'var(--muted)' },
          ].map(s => (
            <div key={s.label} style={{ fontSize: 13, color: 'var(--muted)' }}>
              <span style={{ fontWeight: 700, color: s.color, fontSize: 15 }}>{s.value}</span> {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {['all', 'pending', 'reviewed', 'resolved', 'dismissed'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} style={{
            padding: '7px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
            border: '1.5px solid', cursor: 'pointer', fontFamily: 'inherit',
            borderColor: statusFilter === s ? 'var(--p)' : 'var(--border)',
            background:  statusFilter === s ? 'rgba(91,141,239,0.1)' : 'var(--inp-bg)',
            color:       statusFilter === s ? 'var(--p)' : 'var(--muted)',
            transition: 'all 0.15s',
          }}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
        <button onClick={fetchReports} style={{
          marginLeft: 'auto', padding: '7px 14px', borderRadius: 10, fontSize: 13,
          border: '1.5px solid var(--border)', background: 'var(--inp-bg)',
          color: 'var(--muted)', cursor: 'pointer', fontFamily: 'inherit',
        }}>
          🔄 Refresh
        </button>
      </div>

      {/* Reports table */}
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 48, textAlign: 'center' }}>
            <span className="spinner" />
            <p style={{ color: 'var(--muted)', marginTop: 12, fontSize: 13 }}>Loading reports...</p>
          </div>
        ) : reports.length === 0 ? (
          <EmptyState
            icon="📋"
            title="No reports found"
            subtitle={statusFilter === 'all' ? 'No reports have been submitted yet' : `No ${statusFilter} reports`}
          />
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--card2)' }}>
                {['Service', 'Reported By', 'Reason', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{
                    padding: '12px 16px', textAlign: 'left', fontSize: 11.5,
                    fontWeight: 600, color: 'var(--muted)',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reports.map(r => (
                <tr key={r._id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {r.service?.title || 'Deleted service'}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>
                      {r.service?.category}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>
                      {r.reportedBy?.firstName} {r.reportedBy?.lastName}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                      {r.reportedBy?.email}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 20, fontSize: 11.5, fontWeight: 700,
                      background: 'rgba(242,92,92,0.1)', color: 'var(--red)',
                    }}>
                      {REASON_LABEL[r.reason] || r.reason}
                    </span>
                    {r.details && (
                      <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {r.details}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: 12, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 20, fontSize: 11.5, fontWeight: 700,
                      background: `${STATUS_COLOR[r.status]}22`,
                      color: STATUS_COLOR[r.status],
                    }}>
                      {r.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <Button size="sm" variant="secondary"
                      onClick={() => { setSelected(r); setAdminNote(r.adminNote || ''); }}>
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* Review modal */}
      <Modal
        open={!!selected}
        onClose={() => { setSelected(null); setAdminNote(''); }}
        title="Review Report"
        width={520}
      >
        {selected && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              {[
                { label: 'Service',     value: selected.service?.title || 'Deleted' },
                { label: 'Category',    value: selected.service?.category || '—'    },
                { label: 'Reported By', value: `${selected.reportedBy?.firstName} ${selected.reportedBy?.lastName}` },
                { label: 'Reason',      value: REASON_LABEL[selected.reason] || selected.reason },
              ].map(row => (
                <div key={row.label} style={{ padding: '10px 12px', background: 'var(--card2)', borderRadius: 10 }}>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {row.label}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>
                    {row.value}
                  </div>
                </div>
              ))}
            </div>

            {selected.details && (
              <div style={{ padding: '12px 14px', background: 'var(--card2)', borderRadius: 10, marginBottom: 16, fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>
                <strong style={{ color: 'var(--muted)', fontSize: 11 }}>DETAILS:</strong><br />
                {selected.details}
              </div>
            )}

            {selected.adminNote && (
              <div style={{ padding: '10px 14px', background: 'rgba(91,141,239,0.06)', borderRadius: 10, marginBottom: 12, fontSize: 13, color: 'var(--muted)' }}>
                <strong style={{ color: 'var(--p)' }}>Previous note:</strong> {selected.adminNote}
              </div>
            )}

            <Textarea
              label="Admin Note (optional)"
              placeholder="Add an internal note about this report..."
              value={adminNote}
              onChange={e => setAdminNote(e.target.value)}
              rows={2}
            />

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
              <Button size="sm" variant="secondary" loading={acting}
                onClick={() => updateStatus(selected._id, 'reviewed')}>
                Mark Reviewed
              </Button>
              <Button size="sm" variant="secondary" loading={acting}
                onClick={() => updateStatus(selected._id, 'dismissed')}>
                Dismiss
              </Button>
              <Button size="sm" loading={acting}
                onClick={() => updateStatus(selected._id, 'resolved')}>
                Mark Resolved
              </Button>
              {selected.service && (
                <Button size="sm" variant="danger" loading={acting}
                  onClick={() => removeService(selected)}>
                  🗑️ Remove Service
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
