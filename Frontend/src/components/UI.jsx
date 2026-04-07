import React from 'react';
import ReactDOM from 'react-dom';

/* ── Button ── */
export const Button = ({
  children, onClick, type = 'button', variant = 'primary',
  size = 'md', disabled = false, loading = false, fullWidth = false,
  className = '', style = {}
}) => {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: '8px', border: 'none', cursor: disabled || loading ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit', fontWeight: 600, transition: 'all 0.2s',
    opacity: disabled || loading ? 0.6 : 1,
    width: fullWidth ? '100%' : undefined,
    ...style,
  };

  const variants = {
    primary: {
      background: 'linear-gradient(135deg,var(--p),var(--p2))',
      color: '#fff',
      boxShadow: '0 4px 16px rgba(91,141,239,0.35)',
      borderRadius: '14px',
      padding: size === 'sm' ? '8px 16px' : size === 'lg' ? '14px 28px' : '11px 20px',
      fontSize: size === 'sm' ? '13px' : size === 'lg' ? '15px' : '14px',
    },
    secondary: {
      background: 'var(--inp-bg)',
      color: 'var(--text)',
      border: '1.5px solid var(--border)',
      borderRadius: '14px',
      padding: size === 'sm' ? '7px 14px' : '10px 18px',
      fontSize: size === 'sm' ? '13px' : '14px',
    },
    danger: {
      background: 'rgba(242,92,92,0.12)',
      color: 'var(--red)',
      border: '1.5px solid rgba(242,92,92,0.25)',
      borderRadius: '14px',
      padding: size === 'sm' ? '7px 14px' : '10px 18px',
      fontSize: '13px',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--muted)',
      borderRadius: '10px',
      padding: size === 'sm' ? '6px 12px' : '8px 14px',
      fontSize: '13px',
    },
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={className}
      style={{ ...base, ...variants[variant] }}
    >
      {loading && <span className="spinner" style={{ width:15, height:15 }} />}
      {children}
    </button>
  );
};

/* ── Input ── */
export const Input = ({
  id, label, type = 'text', placeholder, value, onChange,
  error, icon, rightEl, required = false, style = {}
}) => (
  <div style={{ marginBottom: 18, ...style }}>
    {label && (
      <label htmlFor={id} style={{ display:'block', fontSize:12.5, fontWeight:600, color:'var(--muted)', marginBottom:7, letterSpacing:'0.02em' }}>
        {label} {required && <span style={{ color:'var(--p)' }}>*</span>}
      </label>
    )}
    <div style={{ position:'relative' }}>
      {icon && (
        <span style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--muted)', display:'flex', pointerEvents:'none' }}>
          {icon}
        </span>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        min={type === 'number' ? 1 : undefined}
        style={{
          width: '100%',
          padding: `12px 14px 12px ${icon ? '42px' : '14px'}`,
          paddingRight: rightEl ? '44px' : '14px',
          borderRadius: 14,
          border: `1.5px solid ${error ? 'var(--red)' : 'var(--inp-border)'}`,
          background: error ? 'rgba(242,92,92,0.06)' : 'var(--inp-bg)',
          color: 'var(--text)',
          fontSize: 14,
          fontFamily: 'inherit',
          outline: 'none',
          transition: 'all 0.2s',
        }}
        onFocus={e => {
          e.target.style.borderColor = error ? 'var(--red)' : 'var(--p)';
          e.target.style.boxShadow = error ? '0 0 0 4px rgba(242,92,92,0.12)' : '0 0 0 4px rgba(91,141,239,0.12)';
        }}
        onBlur={e => {
          e.target.style.borderColor = error ? 'var(--red)' : 'var(--inp-border)';
          e.target.style.boxShadow = 'none';
        }}
      />
      {rightEl && (
        <span style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)' }}>
          {rightEl}
        </span>
      )}
    </div>
    {error && (
      <p style={{ marginTop:5, fontSize:11.5, color:'var(--red)', display:'flex', alignItems:'center', gap:4 }}>
        <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
        </svg>
        {error}
      </p>
    )}
  </div>
);

/* ── Select ── */
export const Select = ({ id, label, value, onChange, options = [], error, required }) => (
  <div style={{ marginBottom: 18 }}>
    {label && (
      <label htmlFor={id} style={{ display:'block', fontSize:12.5, fontWeight:600, color:'var(--muted)', marginBottom:7 }}>
        {label} {required && <span style={{ color:'var(--p)' }}>*</span>}
      </label>
    )}
    <select
      id={id}
      value={value}
      onChange={onChange}
      style={{
        width:'100%', padding:'12px 14px', borderRadius:14,
        border:`1.5px solid ${error ? 'var(--red)' : 'var(--inp-border)'}`,
        background:'var(--inp-bg)', color:'var(--text)',
        fontSize:14, fontFamily:'inherit', outline:'none',
      }}
    >
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
    {error && <p style={{ marginTop:5, fontSize:11.5, color:'var(--red)' }}>{error}</p>}
  </div>
);

/* ── Textarea ── */
export const Textarea = ({ id, label, value, onChange, placeholder, rows = 4, error, required }) => (
  <div style={{ marginBottom: 18 }}>
    {label && (
      <label htmlFor={id} style={{ display:'block', fontSize:12.5, fontWeight:600, color:'var(--muted)', marginBottom:7 }}>
        {label} {required && <span style={{ color:'var(--p)' }}>*</span>}
      </label>
    )}
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      style={{
        width:'100%', padding:'12px 14px', borderRadius:14, resize:'vertical',
        border:`1.5px solid ${error ? 'var(--red)' : 'var(--inp-border)'}`,
        background:'var(--inp-bg)', color:'var(--text)',
        fontSize:14, fontFamily:'inherit', outline:'none', lineHeight:1.6,
      }}
    />
    {error && <p style={{ marginTop:5, fontSize:11.5, color:'var(--red)' }}>{error}</p>}
  </div>
);

/* ── Badge ── */
export const Badge = ({ children, variant = 'default' }) => {
  const colors = {
    default:     { bg:'rgba(91,141,239,0.15)',  color:'#93B8FF' },
    active:      { bg:'rgba(91,141,239,0.15)',  color:'var(--p)' },
    pending:     { bg:'rgba(244,185,66,0.15)',  color:'var(--acc)' },
    in_progress: { bg:'rgba(91,141,239,0.15)',  color:'var(--p)' },
    delivered:   { bg:'rgba(167,139,250,0.15)', color:'var(--purple)' },
    completed:   { bg:'rgba(34,211,160,0.15)',  color:'var(--green)' },
    cancelled:   { bg:'rgba(242,92,92,0.12)',   color:'var(--red)' },
  };
  const c = colors[variant] || colors.default;
  return (
    <span style={{
      display:'inline-block', padding:'3px 10px', borderRadius:20,
      fontSize:11.5, fontWeight:700, background:c.bg, color:c.color,
    }}>
      {children}
    </span>
  );
};

/* ── Avatar ── */
export const Avatar = ({ initials = '?', size = 32, style = {} }) => (
  <div style={{
    width: size, height: size, borderRadius: Math.round(size * 0.3),
    background: 'linear-gradient(135deg,var(--p),var(--p2))',
    display:'flex', alignItems:'center', justifyContent:'center',
    color:'#fff', fontFamily:"'Sora',sans-serif", fontWeight:700,
    fontSize: Math.round(size * 0.38), flexShrink:0,
    boxShadow:'0 2px 8px rgba(91,141,239,0.3)',
    ...style
  }}>
    {initials}
  </div>
);

/* ── Card ── */
export const Card = ({ children, style = {}, className = '' }) => (
  <div className={className} style={{
    background:'var(--card)', border:'1px solid var(--border)',
    borderRadius:20, padding:24,
    boxShadow:'0 4px 24px rgba(0,0,0,0.1)',
    transition:'background 0.3s',
    ...style
  }}>
    {children}
  </div>
);

/* ── Modal ── */
export const Modal = ({ open, onClose, title, children, width = 520 }) => {
  if (!open) return null;

  const modalContent = (
    <div
      onClick={onClose}
      style={{
        position:'fixed',
        top:0, left:0, right:0, bottom:0,
        background:'rgba(0,0,0,0.65)',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        zIndex:99999,
        backdropFilter:'blur(4px)',
        padding:16,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="animate-up"
        style={{
          background:'var(--card)', border:'1px solid var(--border)',
          borderRadius:24, padding:28, width:'100%', maxWidth:width,
          boxShadow:'0 32px 80px rgba(0,0,0,0.5)',
          maxHeight:'85vh', overflowY:'auto',
          position:'relative',
        }}
      >
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
          <h3 style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:18, color:'var(--text2)' }}>{title}</h3>
          <button onClick={onClose} style={{
            background:'var(--inp-bg)', border:'1px solid var(--border)',
            borderRadius:10, width:32, height:32, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)',
          }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
};

/* ── Stars ── */
export const Stars = ({ rating = 0, size = 14 }) => (
  <span style={{ color:'#F4B942', fontSize:size, letterSpacing:1 }}>
    {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
  </span>
);

/* ── Empty state ── */
export const EmptyState = ({ icon = '📭', title, subtitle, action }) => (
  <div style={{ textAlign:'center', padding:'60px 20px' }}>
    <div style={{ fontSize:48, marginBottom:16 }}>{icon}</div>
    <h3 style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, color:'var(--text2)', marginBottom:8 }}>{title}</h3>
    {subtitle && <p style={{ color:'var(--muted)', fontSize:14, marginBottom:20 }}>{subtitle}</p>}
    {action}
  </div>
);
