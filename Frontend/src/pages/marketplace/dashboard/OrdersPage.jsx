import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../../../utils/api';
import useAuth from '../../../utils/useAuth';
import { Button, Badge, Modal, Textarea, EmptyState } from '../../../components/UI';

const STATUS_LABEL = {
  pending:'Pending', in_progress:'In Progress',
  delivered:'Delivered', completed:'Completed', cancelled:'Cancelled',
};

const TABS = ['As Buyer','As Seller'];

export default function OrdersPage() {
  const { refreshUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleTab, setRoleTab] = useState(0);         // 0=buyer, 1=seller
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);    // order detail modal
  const [actionModal, setActionModal] = useState(null); // {order, action}
  const [note, setNote] = useState('');
  const [acting, setActing] = useState(false);

  const role = roleTab === 0 ? 'buyer' : 'seller';

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ role });
      if (statusFilter !== 'all') params.set('status', statusFilter);
      const { data } = await api.get(`/api/orders?${params}`);
      setOrders(data.orders || []);
    } catch (err) {
      toast.error('Failed to load orders: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  }, [role, statusFilter]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const handleAction = async () => {
    if (!actionModal) return;
    setActing(true);
    try {
      const { order, action } = actionModal;
      if (action === 'cancel') {
        await api.delete(`/api/orders/${order._id}`);
        toast.success('Order cancelled');
      } else {
        await api.put(`/api/orders/${order._id}/status`, {
          status: action,
          deliveryNote: action === 'delivered' ? note : undefined,
          cancellationReason: action === 'cancelled' ? note : undefined,
        });
        toast.success(`Order ${STATUS_LABEL[action]}!`);
      }
      await refreshUser();
      setActionModal(null);
      setNote('');
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed');
    } finally {
      setActing(false);
    }
  };

  const ACTION_MAP = {
    buyer: {
      pending:   [{ label:'Cancel Order', action:'cancel', variant:'danger' }],
      delivered: [
        { label:'Accept & Complete', action:'completed', variant:'primary' },
        { label:'Request Revision', action:'in_progress', variant:'secondary' },
      ],
    },
    seller: {
      pending:     [{ label:'Approve Payment & Start', action:'in_progress', variant:'primary' }, { label:'Reject', action:'cancelled', variant:'danger' }],
      in_progress: [{ label:'Mark Delivered', action:'delivered', variant:'primary' }],
    },
  };

  const getActions = (order) => ACTION_MAP[role]?.[order.status] || [];

  const StatusColors = { pending:'var(--acc)', in_progress:'var(--p)', delivered:'var(--purple)', completed:'var(--green)', cancelled:'var(--red)' };

  return (
    <div className="animate-up">
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <h1 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:24, color:'var(--text2)' }}>My Orders</h1>
          <p style={{ color:'var(--muted)', fontSize:14, marginTop:4 }}>Track your active and completed orders</p>
        </div>
      </div>

      {/* Tabs + filter */}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20, flexWrap:'wrap' }}>
        <div style={{ display:'flex', background:'var(--card2)', borderRadius:12, padding:4 }}>
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setRoleTab(i)} style={{
              padding:'7px 18px', borderRadius:9, fontSize:13, fontWeight:600,
              border:'none', cursor:'pointer', transition:'all 0.15s',
              background: roleTab === i ? 'var(--p)' : 'transparent',
              color: roleTab === i ? '#fff' : 'var(--muted)',
              fontFamily:'inherit',
            }}>{t}</button>
          ))}
        </div>

        <div style={{ display:'flex', gap:6 }}>
          {['all','pending','in_progress','delivered','completed','cancelled'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} style={{
              padding:'6px 12px', borderRadius:10, fontSize:12, fontWeight:600,
              border:'1.5px solid', cursor:'pointer', transition:'all 0.15s',
              borderColor: statusFilter === s ? 'var(--p)' : 'var(--border)',
              background: statusFilter === s ? 'rgba(91,141,239,0.1)' : 'var(--inp-bg)',
              color: statusFilter === s ? 'var(--p)' : 'var(--muted)',
              fontFamily:'inherit',
            }}>
              {s === 'all' ? 'All' : STATUS_LABEL[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{
        background:'var(--card)', border:'1px solid var(--border)', borderRadius:20, overflow:'hidden',
      }}>
        {loading ? (
          <div style={{ padding:48, textAlign:'center', color:'var(--muted)' }}><span className="spinner" /></div>
        ) : orders.length === 0 ? (
          <EmptyState icon="📦" title="No orders found"
            subtitle={roleTab === 0 ? "Browse the marketplace and place your first order!" : "Once someone orders your service, it'll appear here."}
          />
        ) : (
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'var(--card2)' }}>
                {['Service','Seller / Buyer','Date','Due','Status','Slip','Price','Actions'].map(h => (
                  <th key={h} style={{ padding:'12px 16px', textAlign:'left', fontSize:11.5, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.05em', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o._id} style={{ borderTop:'1px solid var(--border)' }}>
                  <td style={{ padding:'14px 16px' }}>
                    <div style={{ fontWeight:600, fontSize:13, color:'var(--text)', maxWidth:180, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                      {o.service?.title || '—'}
                    </div>
                    <div style={{ fontSize:11, color:'var(--muted)', marginTop:2 }}>{o.service?.category}</div>
                  </td>
                  <td style={{ padding:'14px 16px', fontSize:13, color:'var(--muted)' }}>
                    {roleTab === 0
                      ? `${o.seller?.firstName} ${o.seller?.lastName}`
                      : `${o.buyer?.firstName} ${o.buyer?.lastName}`}
                  </td>
                  <td style={{ padding:'14px 16px', fontSize:13, color:'var(--muted)', whiteSpace:'nowrap' }}>
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding:'14px 16px', fontSize:13, color:'var(--muted)', whiteSpace:'nowrap' }}>
                    {o.dueDate ? new Date(o.dueDate).toLocaleDateString() : '—'}
                  </td>
                  <td style={{ padding:'14px 16px' }}>
                    <span style={{
                      padding:'3px 10px', borderRadius:20, fontSize:11.5, fontWeight:700,
                      background:`${StatusColors[o.status]}22`,
                      color:StatusColors[o.status],
                    }}>
                      {STATUS_LABEL[o.status]}
                    </span>
                  </td>
                  <td style={{ padding:'14px 16px' }}>
                    {o.slipUrl ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <a href={`http://localhost:5000${o.slipUrl}`} target="_blank" rel="noreferrer" style={{ fontSize: 12, fontWeight: 600, color: 'var(--p)', textDecoration: 'none' }}>
                          View Slip
                        </a>
                        {o.slipUploadedAt && <span style={{ fontSize: 10, color: 'var(--muted)', whiteSpace:'nowrap' }}>{new Date(o.slipUploadedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>}
                      </div>
                    ) : (
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>—</span>
                    )}
                  </td>
                  <td style={{ padding:'14px 16px', fontWeight:700, color:'var(--p)', fontSize:14 }}>
                    ${o.price}
                  </td>
                  <td style={{ padding:'14px 16px' }}>
                    <div style={{ display:'flex', gap:6 }}>
                      {getActions(o).map(a => (
                        <Button key={a.action} size="sm" variant={a.variant}
                          onClick={() => setActionModal({ order: o, action: a.action, label: a.label })}>
                          {a.label}
                        </Button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Confirm action modal */}
      <Modal open={!!actionModal} onClose={() => { setActionModal(null); setNote(''); }}
        title={actionModal?.label || 'Confirm Action'}>
        <p style={{ color:'var(--muted)', fontSize:14, marginBottom:16 }}>
          Are you sure you want to <strong style={{ color:'var(--text)' }}>{actionModal?.label}</strong> for &ldquo;{actionModal?.order?.service?.title}&rdquo;?
        </p>
        {['delivered','cancelled'].includes(actionModal?.action) && (
          <Textarea
            label={actionModal?.action === 'delivered' ? 'Delivery Note (optional)' : 'Cancellation Reason (optional)'}
            placeholder={actionModal?.action === 'delivered' ? 'Add delivery details…' : 'Why are you cancelling?'}
            value={note} onChange={e => setNote(e.target.value)} rows={3}
          />
        )}
        <div style={{ display:'flex', gap:10, marginTop:8 }}>
          <Button variant="secondary" fullWidth onClick={() => { setActionModal(null); setNote(''); }}>Cancel</Button>
          <Button fullWidth loading={acting}
            variant={actionModal?.action === 'cancel' || actionModal?.action === 'cancelled' ? 'danger' : 'primary'}
            onClick={handleAction}>
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
}
