import React, { useEffect, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import api from '../../../utils/api';
import useAuth from '../../../utils/useAuth';
import { Button, Modal, Input, Select, Textarea, Badge, Stars, EmptyState, Card } from '../../../components/UI';

const CATEGORIES = [
  { value:'', label:'Select category…' },
  ...['Programming','Design','Writing','Tutoring','Music','Business','Other'].map(c => ({ value:c, label:c })),
];

const GRADIENTS = [
  { label:'Blue',    value:'linear-gradient(90deg,#5B8DEF,#3A6FD8)' },
  { label:'Indigo',  value:'linear-gradient(90deg,#818CF8,#4F46E5)' },
  { label:'Green',   value:'linear-gradient(90deg,#22D3A0,#059669)' },
  { label:'Amber',   value:'linear-gradient(90deg,#F4B942,#F59E0B)' },
  { label:'Red',     value:'linear-gradient(90deg,#F25C5C,#DC2626)' },
  { label:'Purple',  value:'linear-gradient(90deg,#A78BFA,#7C3AED)' },
];

const EMPTY_FORM = {
  title:'', description:'', category:'', price:'', deliveryDays:'3',
  tags:'', coverGradient: GRADIENTS[0].value,
};

export default function MyServicesPage() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);  // null | 'create' | service obj
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchMyServices = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/services/my');
      setServices(data);
    } catch {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMyServices(); }, [fetchMyServices]);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setModal('create');
  };

  const openEdit = (svc) => {
    setForm({
      title: svc.title, description: svc.description,
      category: svc.category, price: String(svc.price),
      deliveryDays: String(svc.deliveryDays),
      tags: svc.tags?.join(', ') || '',
      coverGradient: svc.coverGradient || GRADIENTS[0].value,
    });
    setErrors({});
    setModal(svc);
  };

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.title || form.title.length < 5)  e.title = 'Title must be at least 5 characters';
    if (!form.description || form.description.length < 20) e.description = 'Description must be at least 20 characters';
    if (!form.category)     e.category = 'Please select a category';
    if (!form.price || isNaN(form.price) || Number(form.price) < 1) e.price = 'Price must be at least Rs.1/=';
    if (!form.deliveryDays || Number(form.deliveryDays) < 1) e.deliveryDays = 'Delivery must be at least 1 day';
    return e;
  };

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSaving(true);
    const payload = {
      title: form.title, description: form.description,
      category: form.category, price: Number(form.price),
      deliveryDays: Number(form.deliveryDays),
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      coverGradient: form.coverGradient,
    };
    try {
      if (modal === 'create') {
        const { data } = await api.post('/api/services', payload);
        setServices(prev => [data, ...prev]);
        toast.success('Service created! 🎉');
      } else {
        const { data } = await api.put(`/api/services/${modal._id}`, payload);
        setServices(prev => prev.map(s => s._id === data._id ? data : s));
        toast.success('Service updated!');
      }
      setModal(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (svc) => {
    try {
      const { data } = await api.put(`/api/services/${svc._id}`, { isActive: !svc.isActive });
      setServices(prev => prev.map(s => s._id === data._id ? data : s));
      toast.success(data.isActive ? 'Service is now Active — visible in marketplace!' : 'Service Deactivated — hidden from marketplace');
    } catch {
      toast.error('Failed to update service');
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/api/services/${deleteTarget._id}`);
      setServices(prev => prev.filter(s => s._id !== deleteTarget._id));
      toast.success('Service permanently deleted');
      setDeleteTarget(null);
    } catch {
      toast.error('Failed to delete service');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="animate-up">
      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <h1 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:24, color:'var(--text2)' }}>My Services</h1>
          <p style={{ color:'var(--muted)', fontSize:14, marginTop:4 }}>Manage the services you offer</p>
        </div>
        <Button onClick={openCreate}>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
          </svg>
          Create Service
        </Button>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ textAlign:'center', padding:64 }}><span className="spinner" /></div>
      ) : services.length === 0 ? (
        <EmptyState icon="🛠️" title="No services yet"
          subtitle="Create your first service and start earning!"
          action={<Button onClick={openCreate}>Create Service</Button>}
        />
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20 }}>
          {services.map(svc => (
            <Card key={svc._id} style={{ padding:0, overflow:'hidden' }}>
              {/* Cover */}
              <div style={{
                height:70, background: svc.coverGradient || GRADIENTS[0].value,
                position:'relative',
              }}>
                {!svc.isActive && (
                  <div style={{
                    position:'absolute', inset:0, background:'rgba(0,0,0,0.55)',
                    display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                    gap:4,
                  }}>
                    <span style={{ fontSize:18 }}>⏸</span>
                    <span style={{ fontSize:11, fontWeight:700, color:'#fff', letterSpacing:'0.08em' }}>DEACTIVATED</span>
                    <span style={{ fontSize:10, color:'rgba(255,255,255,0.7)' }}>Hidden from marketplace</span>
                  </div>
                )}
              </div>

              <div style={{ padding:18 }}>
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:8 }}>
                  <div>
                    <span style={{
                      display:'inline-block', padding:'2px 8px', borderRadius:20,
                      fontSize:10.5, fontWeight:700, background:'rgba(91,141,239,0.1)', color:'var(--p)', marginBottom:6,
                    }}>{svc.category}</span>
                    <h3 style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:14, color:'var(--text2)', lineHeight:1.3 }}>
                      {svc.title}
                    </h3>
                  </div>
                  <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:18, color:'var(--p)', flexShrink:0 }}>
                    Rs.{svc.price}/=
                  </div>
                </div>

                <p style={{ fontSize:12.5, color:'var(--muted)', marginTop:8, marginBottom:12, lineHeight:1.5,
                  display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                  {svc.description}
                </p>

                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Stars rating={svc.avgRating} size={12} />
                      <span style={{ fontSize:11, color:'var(--muted)', marginLeft:4 }}>
                        {svc.reviewCount} reviews
                      </span>
                    </div>
                    <span style={{ fontSize:10, color:'var(--muted)' }}>
                      📅 {new Date(svc.createdAt).toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <span style={{ fontSize:12, color:'var(--muted)' }}>
                    📦 {svc.totalOrders} orders · ⏱ {svc.deliveryDays}d
                  </span>
                </div>

                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Button size="sm" variant="secondary" style={{ flex:1 }} onClick={() => openEdit(svc)}>
                    ✏️ Edit
                  </Button>
                  <Button
                    size="sm"
                    variant={svc.isActive ? 'secondary' : 'primary'}
                    onClick={() => toggleActive(svc)}
                    style={{ flex:1 }}
                  >
                    {svc.isActive ? '⏸ Deactivate' : '▶ Activate'}
                  </Button>
                  <Button size="sm" variant="danger" style={{ flex:1 }} onClick={() => setDeleteTarget(svc)}>
                    🗑️ Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal open={!!modal} onClose={() => setModal(null)}
        title={modal === 'create' ? 'Create New Service' : 'Edit Service'}
        width={560}>
        <Input id="title" label="Service Title" placeholder="e.g. React.js Web App Development"
          value={form.title} onChange={set('title')} error={errors.title} required />
        <Textarea id="description" label="Description"
          placeholder="Describe what you offer, your experience, deliverables…"
          value={form.description} onChange={set('description')} error={errors.description} rows={4} required />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          <Select id="category" label="Category" value={form.category} onChange={set('category')}
            options={CATEGORIES} error={errors.category} required />
          <Input id="price" label="Price (Rs.)" type="number" placeholder="e.g. 50"
            value={form.price} onChange={set('price')} error={errors.price} required />
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          <Input id="deliveryDays" label="Delivery Days" type="number" placeholder="3"
            value={form.deliveryDays} onChange={set('deliveryDays')} error={errors.deliveryDays} required />
          <Input id="tags" label="Tags (comma separated)" placeholder="react, frontend, web"
            value={form.tags} onChange={set('tags')} />
        </div>

        {/* Cover gradient picker */}
        <div style={{ marginBottom:18 }}>
          <label style={{ display:'block', fontSize:12.5, fontWeight:600, color:'var(--muted)', marginBottom:8 }}>Cover Color</label>
          <div style={{ display:'flex', gap:10 }}>
            {GRADIENTS.map(g => (
              <div key={g.value} onClick={() => setForm(f => ({ ...f, coverGradient: g.value }))}
                style={{
                  width:40, height:28, borderRadius:8, background:g.value, cursor:'pointer',
                  border: form.coverGradient === g.value ? '3px solid #fff' : '3px solid transparent',
                  boxShadow: form.coverGradient === g.value ? '0 0 0 2px var(--p)' : 'none',
                  transition:'all 0.15s',
                }} />
            ))}
          </div>
        </div>

        <div style={{ display:'flex', gap:10, marginTop:8 }}>
          <Button variant="secondary" fullWidth onClick={() => setModal(null)}>Cancel</Button>
          <Button fullWidth loading={saving} onClick={handleSave}>
            {modal === 'create' ? 'Create Service' : 'Save Changes'}
          </Button>
        </div>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="🗑️ Permanently Delete Service" width={430}>
        <div style={{ marginBottom:16, padding:'12px 14px', background:'rgba(242,92,92,0.08)', border:'1px solid rgba(242,92,92,0.2)', borderRadius:12 }}>
          <p style={{ fontSize:13, color:'var(--red)', fontWeight:600, marginBottom:4 }}>⚠️ This cannot be undone!</p>
          <p style={{ fontSize:13, color:'var(--muted)' }}>
            The service will be permanently removed from both the Marketplace and My Services.
          </p>
        </div>
        <p style={{ color:'var(--muted)', fontSize:14, marginBottom:8 }}>
          You are about to delete:
        </p>
        <p style={{ fontWeight:700, fontSize:15, color:'var(--text)', marginBottom:20 }}>
          "{deleteTarget?.title}"
        </p>
        <div style={{ padding:'10px 14px', background:'var(--card2)', borderRadius:10, fontSize:13, color:'var(--muted)', marginBottom:20 }}>
          💡 <strong style={{color:'var(--text)'}}>Tip:</strong> If you just want to hide it temporarily, use <strong style={{color:'var(--text)'}}>Deactivate</strong> instead.
        </div>
        <div style={{ display:'flex', gap:10 }}>
          <Button variant="secondary" fullWidth onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" fullWidth loading={deleting} onClick={handleDelete}>Yes, Delete Permanently</Button>
        </div>
      </Modal>
    </div>
  );
}
