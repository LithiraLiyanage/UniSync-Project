import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../../utils/api';
import useAuth from '../../../utils/useAuth';
import { Button, Stars, Modal, Textarea, EmptyState, Avatar, Select } from '../../../components/UI';

const CATEGORIES = ['All', 'Programming', 'Design', 'Writing', 'Tutoring', 'Music', 'Business', 'Other'];
const REPORT_REASONS = [
  { value: '', label: 'Select a reason...' },
  { value: 'Spam', label: 'Spam' },
  { value: 'Inappropriate content', label: 'Inappropriate content' },
  { value: 'Fake service', label: 'Fake service' },
  { value: 'Scam', label: 'Scam' },
  { value: 'Other', label: 'Other' },
];

// ── 3-Dot Menu ────────────────────────────────────────────────────────
const DotMenu = ({ service, user, onReport, onMessage, onAdminDelete, onRate }) => {
  const [open, setOpen] = useState(false);
  const isAdmin = user?.role === 'admin';
  const isOwner = service.seller?._id === user?._id || service.seller?.id === user?._id;

  if (isOwner && !isAdmin) return null;

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={e => { e.stopPropagation(); setOpen(v => !v); }}
        style={{
          position: 'absolute', top: 10, right: 10, zIndex: 10,
          width: 30, height: 30, borderRadius: '50%',
          background: 'rgba(0,0,0,0.35)', border: 'none',
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: '#fff', backdropFilter: 'blur(4px)',
          transition: 'background 0.15s',
        }}
        title="Options"
      >
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/>
        </svg>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 99 }} />
          <div style={{
            position: 'absolute', top: 44, right: 0, zIndex: 100,
            background: 'var(--card)', border: '1px solid var(--border)',
            borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
            minWidth: 170, overflow: 'hidden',
          }}>
            {/* Message owner — available to admin and non-owner students */}
            {!isOwner && (
              <button onClick={() => { setOpen(false); onMessage(service); }} style={menuItemStyle()}>
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
                Message Owner
              </button>
            )}

            {/* Report — available to all non-owners */}
            {!isOwner && (
              <button onClick={() => { setOpen(false); onReport(service); }} style={menuItemStyle()}>
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/>
                </svg>
                Report Service
              </button>
            )}

            {/* Rate — available to all non-owners (completed order no longer strictly required) */}
            {!isOwner && (
              <button onClick={() => { setOpen(false); onRate(service); }} style={menuItemStyle()}>
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
                Rate Seller
              </button>
            )}

            {/* Admin-only: delete */}
            {isAdmin && (
              <button onClick={() => { setOpen(false); onAdminDelete(service); }} style={menuItemStyle(true)}>
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Remove Service
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const menuItemStyle = (danger = false) => ({
  display: 'flex', alignItems: 'center', gap: 10,
  width: '100%', padding: '11px 16px', border: 'none',
  background: 'transparent', cursor: 'pointer', fontFamily: 'inherit',
  fontSize: 13, fontWeight: 500, textAlign: 'left',
  color: danger ? 'var(--red)' : 'var(--text)',
  transition: 'background 0.12s',
  borderBottom: '1px solid var(--border)',
});

// ── Service Card ──────────────────────────────────────────────────────
const ServiceCard = ({ service, user, onOrder, onReport, onMessage, onAdminDelete, onRate }) => (
  <div style={{
    background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 20,
    overflow: 'hidden', transition: 'all 0.2s',
  }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
  >
    {/* Cover with 3-dot menu */}
    <div style={{ height: 80, background: service.coverGradient || 'linear-gradient(90deg,#5B8DEF,#3A6FD8)', position: 'relative' }}>
      <DotMenu service={service} user={user} onReport={onReport} onMessage={onMessage} onAdminDelete={onAdminDelete} onRate={onRate} />
    </div>

    <div style={{ padding: 18 }}>
      <span style={{
        display: 'inline-block', padding: '3px 10px', borderRadius: 20,
        fontSize: 11, fontWeight: 700, background: 'rgba(91,141,239,0.12)',
        color: 'var(--p)', marginBottom: 10,
      }}>
        {service.category}
      </span>

      <h3 style={{
        fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 14,
        color: 'var(--text2)', marginBottom: 6, lineHeight: 1.4,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {service.title}
      </h3>

      <p style={{
        fontSize: 12, color: 'var(--muted)', marginBottom: 12, lineHeight: 1.4,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {service.description}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <Avatar initials={service.seller?.initials || '?'} size={22} />
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>
          {service.seller?.name}
          {service.seller?.university ? ` · ${service.seller.university}` : ''}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Stars rating={service.avgRating || 0} size={12} />
            <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 4 }}>
              {service.avgRating > 0 ? service.avgRating : 'New'} ({service.reviewCount || 0})
            </span>
          </div>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>
            ⏱ {service.deliveryDays} Day Delivery
          </span>
          <span style={{ fontSize: 10, color: 'var(--muted)' }}>
            📅 {new Date(service.createdAt).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 17, color: 'var(--p)' }}>
          Rs.{service.price}/=
        </div>
      </div>

      {/* Own service badge OR Order button */}
      {(service.seller?._id === user?._id || service.seller?.id === user?._id) ? (
        <div style={{
          width: '100%', padding: '8px', borderRadius: 12, textAlign: 'center',
          fontSize: 12, fontWeight: 600, color: 'var(--muted)',
          background: 'var(--inp-bg)', border: '1px solid var(--border)',
        }}>
          Your Service
        </div>
      ) : (
        <Button
          fullWidth size="sm"
          onClick={e => { e.stopPropagation(); onOrder(service); }}
        >
          Order Now
        </Button>
      )}
    </div>
  </div>
);

// ── Main Page ─────────────────────────────────────────────────────────
export default function MarketplacePage() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.role === 'admin';

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  // Order modal
  const [ordering, setOrdering] = useState(null);
  const [requirements, setRequirements] = useState('');
  const [slipFile, setSlipFile] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);

  // Report modal
  const [reporting, setReporting] = useState(null);
  const [reportReason, setReportReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');
  const [reportLoading, setReportLoading] = useState(false);

  // Rate modal
  const [ratingService, setRatingService] = useState(null);
  const [ratingScore, setRatingScore] = useState(5);
  const [ratingComment, setRatingComment] = useState('');
  const [ratingLoading, setRatingLoading] = useState(false);

  // Admin message modal
  const [messaging, setMessaging] = useState(null);
  const [msgText, setMsgText] = useState('');
  const [msgLoading, setMsgLoading] = useState(false);

  // Admin delete modal
  const [adminDeleting, setAdminDeleting] = useState(null);
  const [adminDelLoading, setAdminDelLoading] = useState(false);

  // AI Recommender
  const [aiRecommendation, setAiRecommendation] = useState(null);

  useEffect(() => {
    // Fetch AI suggestion silently, don't block main UI
    api.get('/api/services/recommendations')
      .then(res => setAiRecommendation(res.data))
      .catch(() => {});
  }, []);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('q', search);
      if (category !== 'All') params.set('category', category);
      const { data } = await api.get(`/api/services?${params}`);
      setServices(data.services || []);

      // Track search query for Recommender
      if (search && search.trim() && user?.role !== 'admin') {
        api.post('/api/users/searches', { query: search }).catch(() => {});
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      toast.error('Failed to load services: ' + msg);
    } finally {
      setLoading(false);
    }
  }, [search, category, user?.role]);

  useEffect(() => {
    const t = setTimeout(fetchServices, 300);
    return () => clearTimeout(t);
  }, [fetchServices]);

  // ── Order ──────────────────────────────────────────────────────────
  const handleOrder = async () => {
    if (!slipFile) {
      toast.error('Please upload a payment slip');
      return;
    }
    setOrderLoading(true);
    try {
      const formData = new FormData();
      formData.append('serviceId', ordering._id);
      formData.append('requirements', requirements);
      formData.append('slip', slipFile);

      await api.post('/api/orders', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      await refreshUser();
      toast.success('Order placed! 🎉');
      setOrdering(null);
      setRequirements('');
      setSlipFile(null);
      navigate('/earn/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setOrderLoading(false);
    }
  };

  // ── Report ─────────────────────────────────────────────────────────
  const handleReport = async () => {
    if (!reportReason) { toast.error('Please select a reason'); return; }
    setReportLoading(true);
    try {
      await api.post('/api/reports', { serviceId: reporting._id, reason: reportReason, details: reportDetails });
      toast.success('Report submitted. Admin will review it shortly.');
      setReporting(null);
      setReportReason('');
      setReportDetails('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit report');
    } finally {
      setReportLoading(false);
    }
  };

  // ── Rate ───────────────────────────────────────────────────────────
  const handleRate = async () => {
    setRatingLoading(true);
    try {
      const { data } = await api.post(`/api/services/${ratingService._id}/reviews`, {
        rating: ratingScore,
        comment: ratingComment,
      });
      toast.success(data.message || 'Rating submitted!');
      setRatingService(null);
      setRatingScore(5);
      setRatingComment('');
      // update local services list with new avg for all services by this seller
      setServices(prev => prev.map(s => {
        const sellerId = s.seller?._id || s.seller?.id;
        const targetSellerId = ratingService?.seller?._id || ratingService?.seller?.id;
        if (sellerId === targetSellerId) {
          return { ...s, avgRating: data.avgRating, reviewCount: data.reviewCount || s.reviewCount + 1 };
        }
        return s;
      }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit rating');
    } finally {
      setRatingLoading(false);
    }
  };

  // ── Admin Message ──────────────────────────────────────────────────
  const handleAdminMessage = async () => {
    if (!msgText.trim()) { toast.error('Please type a message'); return; }
    setMsgLoading(true);
    try {
      await api.post('/api/admin/message', {
        recipientId: messaging.seller?._id || messaging.seller?.id,
        message: msgText.trim(),
        serviceId: messaging._id,
      });
      toast.success('Message sent to service owner!');
      setMessaging(null);
      setMsgText('');
      navigate('/earn/messages');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message');
    } finally {
      setMsgLoading(false);
    }
  };

  // ── Student Message ────────────────────────────────────────────────
  const handleStudentMessage = async (service) => {
    try {
      const recipientId = service.seller?._id || service.seller?.id;
      const { data } = await api.post('/api/messages', { recipientId });
      navigate('/earn/messages');
      toast.success('Conversation opened!');
    } catch (err) {
      toast.error('Failed to open conversation');
    }
  };

  // ── Admin Delete ───────────────────────────────────────────────────
  const handleAdminDelete = async () => {
    setAdminDelLoading(true);
    try {
      await api.delete(`/api/admin/services/${adminDeleting._id}`);
      setServices(prev => prev.filter(s => s._id !== adminDeleting._id));
      toast.success('Service removed by admin');
      setAdminDeleting(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove service');
    } finally {
      setAdminDelLoading(false);
    }
  };

  return (
    <div className="animate-up">
      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 24, color: 'var(--text2)' }}>
            Marketplace
            {isAdmin && (
              <span style={{
                marginLeft: 12, fontSize: 12, fontWeight: 700, padding: '3px 10px',
                borderRadius: 20, background: 'rgba(242,92,92,0.12)', color: 'var(--red)',
              }}>ADMIN VIEW</span>
            )}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>
            {isAdmin ? 'Manage all services — click ⋮ on any card to message owner or remove' : 'Discover services offered by fellow students'}
          </p>
        </div>
        {isAdmin && (
          <Button variant="secondary" size="sm" onClick={() => navigate('/earn/admin')}>
            ⚙️ Admin Panel
          </Button>
        )}
      </div>



      {/* AI Recommender Banner */}
      {aiRecommendation && (
        <div style={{
          marginBottom: 24, padding: '20px 24px', borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(236,72,153,0.1) 100%)',
          border: '1px solid rgba(236,72,153,0.2)',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          position: 'relative', overflow: 'hidden'
        }}>
          {/* Glassmorphism/Glow effect */}
          <div style={{
            position: 'absolute', top: -50, left: -50, width: 150, height: 150,
            background: 'rgba(168,85,247,0.2)', filter: 'blur(40px)', borderRadius: '50%',
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, position: 'relative', zIndex: 1 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
              boxShadow: '0 4px 12px rgba(236,72,153,0.3)', flexShrink: 0
            }}>
              ✨
            </div>
            <div>
              <h3 style={{ fontFamily: "'Sora',sans-serif", fontSize: 15, fontWeight: 800, color: '#ec4899', marginBottom: 3, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                AI Suggestion
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text)', opacity: 0.9 }}>
                {aiRecommendation.message}
              </p>
            </div>
          </div>
          <Button style={{ position: 'relative', zIndex: 1, background: '#ec4899', borderColor: '#ec4899', color: '#fff', boxShadow: '0 4px 14px rgba(236,72,153,0.4)', borderRadius: 14, padding: '10px 18px', fontSize: 13, fontWeight: 700 }}
            onClick={() => {
              setSearch(aiRecommendation.keyword);
              setCategory(aiRecommendation.category || 'All');
            }}>
            Explore {aiRecommendation.keyword} →
          </Button>
        </div>
      )}

      {/* Search + Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
          <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}
            width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search services..."
            style={{
              width: '100%', padding: '11px 14px 11px 42px', borderRadius: 14,
              border: '1.5px solid var(--inp-border)', background: 'var(--inp-bg)',
              color: 'var(--text)', fontSize: 14, fontFamily: 'inherit', outline: 'none',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)} style={{
              padding: '8px 16px', borderRadius: 12, fontSize: 13, fontWeight: 600,
              border: '1.5px solid',
              borderColor: category === c ? 'var(--p)' : 'var(--border)',
              background: category === c ? 'rgba(91,141,239,0.12)' : 'var(--inp-bg)',
              color: category === c ? 'var(--p)' : 'var(--muted)',
              cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit',
            }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Service Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 64 }}><span className="spinner" /></div>
      ) : services.length === 0 ? (
        <EmptyState icon="🔍" title="No services found"
          subtitle="Try adjusting your search or filters"
          action={<Button onClick={() => { setSearch(''); setCategory('All'); }}>Clear Filters</Button>}
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 20 }}>
          {services.map(s => (
            <ServiceCard
              key={s._id} service={s} user={user}
              onOrder={setOrdering}
              onReport={setReporting}
              onMessage={isAdmin ? setMessaging : handleStudentMessage}
              onAdminDelete={setAdminDeleting}
              onRate={setRatingService}
            />
          ))}
        </div>
      )}

      {/* ── ORDER MODAL ─────────────────────────────────────────────── */}
      <Modal open={!!ordering} onClose={() => { setOrdering(null); setRequirements(''); setSlipFile(null); }}
        title={`Order: ${ordering?.title || ''}`}>
        <div style={{ marginBottom: 16, padding: '12px 16px', background: 'var(--card2)', borderRadius: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>Price</span>
            <span style={{ fontWeight: 700, color: 'var(--p)', fontSize: 16 }}>Rs.{ordering?.price}/=</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: 'var(--muted)' }}>Delivery</span>
            <span style={{ fontSize: 13, color: 'var(--text)' }}>{ordering?.deliveryDays} day(s)</span>
          </div>
        </div>
        
        <div style={{
          padding: '10px 14px', background: 'rgba(91,141,239,0.08)',
          border: '1px solid rgba(91,141,239,0.2)', borderRadius: 10,
          marginBottom: 16, fontSize: 13, color: 'var(--p)', lineHeight: 1.5
        }}>
          <strong>Payment Instructions:</strong><br/>
          Please transfer exactly <strong>Rs.{ordering?.price}/=</strong> to the following bank account:<br/><br/>
          <span>Bank: <strong>Uni Student Bank</strong></span><br/>
          <span>Account Name: <strong>UniSync Escrow</strong></span><br/>
          <span>Account No: <strong>123456789</strong></span><br/><br/>
          After transferring, please upload the receipt/slip below.
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Payment Slip *</label>
           <input type="file" accept="image/*,.pdf" onChange={e => setSlipFile(e.target.files[0])} style={{
              width: '100%', padding: '8px', fontSize: 13, color: 'var(--text)', 
              background: 'var(--inp-bg)', border: '1px solid var(--border)', borderRadius: 8
           }}/>
        </div>

        <Textarea id="req" label="Your Requirements (optional)"
          placeholder="Describe what you need..."
          value={requirements} onChange={e => setRequirements(e.target.value)} rows={3} />
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="secondary" fullWidth onClick={() => { setOrdering(null); setRequirements(''); setSlipFile(null); }}>Cancel</Button>
          <Button fullWidth loading={orderLoading}
            onClick={handleOrder}>
            Confirm — Rs.{ordering?.price}/=
          </Button>
        </div>
      </Modal>

      {/* ── REPORT MODAL ────────────────────────────────────────────── */}
      <Modal open={!!reporting} onClose={() => { setReporting(null); setReportReason(''); setReportDetails(''); }}
        title="Report Service" width={440}>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 16 }}>
          Report <strong style={{ color: 'var(--text)' }}>{reporting?.title}</strong> to admin for review.
        </p>
        <Select
          id="reason" label="Reason *"
          value={reportReason}
          onChange={e => setReportReason(e.target.value)}
          options={REPORT_REASONS}
        />
        <Textarea
          id="details" label="Additional Details (optional)"
          placeholder="Provide more context about the issue..."
          value={reportDetails}
          onChange={e => setReportDetails(e.target.value)}
          rows={3}
        />
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <Button variant="secondary" fullWidth onClick={() => { setReporting(null); setReportReason(''); setReportDetails(''); }}>
            Cancel
          </Button>
          <Button variant="danger" fullWidth loading={reportLoading} onClick={handleReport}>
            Submit Report
          </Button>
        </div>
      </Modal>

      {/* ── RATE MODAL ─────────────────────────────────────────────── */}
      <Modal open={!!ratingService} onClose={() => { setRatingService(null); setRatingScore(5); setRatingComment(''); }}
        title="Rate Seller" width={440}>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 16 }}>
          Rate <strong style={{ color: 'var(--text)' }}>{ratingService?.seller?.name}</strong> based on your experience.
        </p>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 8 }}>Rating (1-5 Stars)</label>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1, 2, 3, 4, 5].map(star => (
              <svg key={star} onClick={() => setRatingScore(star)} style={{ cursor: 'pointer', transition: 'transform 0.1s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                width="28" height="28" fill={star <= ratingScore ? 'var(--p)' : 'var(--inp-border)'} viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
        </div>
        <Textarea
          id="comment" label="Review Comment (optional)"
          placeholder="Share your experience..."
          value={ratingComment}
          onChange={e => setRatingComment(e.target.value)}
          rows={3}
        />
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <Button variant="secondary" fullWidth onClick={() => { setRatingService(null); setRatingScore(5); setRatingComment(''); }}>
            Cancel
          </Button>
          <Button fullWidth loading={ratingLoading} onClick={handleRate}>
            Submit Rating
          </Button>
        </div>
      </Modal>

      {/* ── ADMIN MESSAGE MODAL ──────────────────────────────────────── */}
      <Modal open={!!messaging} onClose={() => { setMessaging(null); setMsgText(''); }}
        title="Message Service Owner" width={440}>
        <div style={{ marginBottom: 16, padding: '10px 14px', background: 'rgba(91,141,239,0.08)', borderRadius: 10, fontSize: 13, color: 'var(--p)' }}>
          Sending as <strong>Admin</strong> to <strong>{messaging?.seller?.name}</strong>
          {' '}about <strong>{messaging?.title}</strong>
        </div>
        <Textarea
          id="adminMsg" label="Your Message *"
          placeholder="Type your message to the service owner..."
          value={msgText}
          onChange={e => setMsgText(e.target.value)}
          rows={4}
        />
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <Button variant="secondary" fullWidth onClick={() => { setMessaging(null); setMsgText(''); }}>Cancel</Button>
          <Button fullWidth loading={msgLoading} onClick={handleAdminMessage}>Send Message</Button>
        </div>
      </Modal>

      {/* ── ADMIN DELETE MODAL ───────────────────────────────────────── */}
      <Modal open={!!adminDeleting} onClose={() => setAdminDeleting(null)} title="Remove Service" width={400}>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
          Are you sure you want to remove <strong style={{ color: 'var(--text)' }}>{adminDeleting?.title}</strong>?
          This will hide it from all users and mark any pending reports as resolved.
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="secondary" fullWidth onClick={() => setAdminDeleting(null)}>Cancel</Button>
          <Button variant="danger" fullWidth loading={adminDelLoading} onClick={handleAdminDelete}>
            Remove Service
          </Button>
        </div>
      </Modal>
    </div>
  );
}
