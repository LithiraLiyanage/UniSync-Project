import React, { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../utils/useAuth';
import { useTheme } from '../../context/ThemeContext';
import { Avatar } from '../../components/UI';

import OverviewPage    from './dashboard/OverviewPage';
import MarketplacePage from './dashboard/MarketplacePage';
import OrdersPage      from './dashboard/OrdersPage';
import MessagesPage    from './dashboard/MessagesPage';
import MyServicesPage  from './dashboard/MyServicesPage';
import ProfilePage       from './dashboard/ProfilePage';
import AdminPage         from './dashboard/AdminPage';
import AdminReportsPage    from './dashboard/AdminReportsPage';
import NotificationBell    from '../../components/NotificationBell';

const NAV_LINKS = [
  { to: '/earn',            label: 'Overview',    end: true },
  { to: '/earn/marketplace', label: 'Marketplace' },
  { to: '/earn/orders',      label: 'Orders'      },
  { to: '/earn/messages',    label: 'Messages'    },
];

const getSidebarItems = (isAdmin) => [
  { to: '/earn',              label: 'Overview',      icon: 'home',     end: true },
  { to: '/earn/marketplace',  label: 'Marketplace',   icon: 'shop'      },
  ...(!isAdmin ? [
    { to: '/earn/orders',     label: 'My Orders',     icon: 'orders'    },
    { to: '/earn/messages',   label: 'Messages',      icon: 'chat'      },
    { to: '/earn/my-services',label: 'My Services',   icon: 'services', section: 'Seller' },
  ] : [
    { to: '/earn/messages',   label: 'Messages',      icon: 'chat',     section: 'Admin Tools' },
    { to: '/earn/admin/reports', label: 'Reports',    icon: 'reports'   },
  ]),
  { to: '/earn/profile',      label: 'Profile',       icon: 'profile'   },
  { to: '/earn/admin',        label: 'Admin Panel',   icon: 'profile',  adminOnly: true },
];

const SvgIcon = ({ name }) => {
  const icons = {
    home:     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>,
    reports:  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>,
    shop:     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>,
    orders:   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>,
    chat:     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>,
    services: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>,
    profile:  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>,
    logout:   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>,
  };
  return (
    <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {icons[name]}
    </svg>
  );
};

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';
  const SIDEBAR_ITEMS = getSidebarItems(isAdmin);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  const activeLinkStyle = {
    color: 'var(--p)',
    background: 'rgba(91,141,239,0.1)',
    fontWeight: 600,
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100vh', background:'var(--bg)' }}>

      {/* ── TOP NAV ── */}
      <nav style={{
        height:62, background:'var(--topnav-bg)', borderBottom:'1px solid var(--border)',
        display:'flex', alignItems:'center', padding:'0 24px', gap:12, flexShrink:0,
        backdropFilter:'blur(16px)', position:'sticky', top:0, zIndex:50,
        transition:'background 0.3s',
      }}>
        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:8, marginRight:'auto' }}>
          <div style={{
            width:32, height:32, background:'linear-gradient(135deg,var(--p),var(--p2))',
            borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:"'Sora',sans-serif", fontWeight:900, fontSize:14, color:'#fff',
          }}>U</div>
          <span style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:17, color:'var(--text2)' }}>UniSync</span>
        </div>

        {/* Nav links */}
        <div style={{ display:'flex', gap:4 }}>
          {NAV_LINKS.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end}
              style={({ isActive }) => ({
                padding:'6px 14px', borderRadius:10, fontSize:13,
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--p)' : 'var(--muted)',
                background: isActive ? 'rgba(91,141,239,0.1)' : 'transparent',
                textDecoration:'none', transition:'all 0.15s',
              })}>
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display:'flex', alignItems:'center', gap:10, marginLeft:'auto' }}>
          {/* Wallet */}
          <div style={{
            display:'flex', alignItems:'center', gap:6, padding:'6px 14px',
            background:'rgba(91,141,239,0.1)', border:'1px solid rgba(91,141,239,0.2)',
            borderRadius:12, fontSize:13, fontWeight:600, color:'var(--p)',
          }}>
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            ${user?.walletBalance?.toFixed(2) || '0.00'}
          </div>

          <NotificationBell />

          {/* Theme toggle */}
          <button onClick={toggleTheme} style={{
            width:36, height:36, borderRadius:12, border:'1px solid var(--border)',
            background:'var(--inp-bg)', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center', color:'var(--muted)',
          }}>
            {theme === 'dark'
              ? <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
              : <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            }
          </button>

          {/* User chip */}
          <div onClick={() => navigate('/earn/profile')} style={{
            display:'flex', alignItems:'center', gap:8, padding:'5px 10px 5px 5px',
            background:'var(--inp-bg)', border:'1px solid var(--border)',
            borderRadius:12, cursor:'pointer', transition:'all 0.15s',
          }}>
            <Avatar initials={user?.initials || 'U'} size={28} />
            <span style={{ fontSize:13, fontWeight:600, color:'var(--text)' }}>{user?.name}</span>
          </div>
        </div>
      </nav>

      {/* ── BODY ── */}
      <div style={{ display:'flex', flex:1, overflow:'hidden' }}>

        {/* ── SIDEBAR ── */}
        <aside style={{
          width:220, background:'var(--sidebar-bg)', borderRight:'1px solid var(--border)',
          padding:'16px 12px', display:'flex', flexDirection:'column', gap:2,
          flexShrink:0, backdropFilter:'blur(12px)', transition:'background 0.3s',
          overflowY:'auto',
        }}>
          {SIDEBAR_ITEMS.filter(item => !item.adminOnly || user?.role === 'admin').map((item, idx) => (
            <React.Fragment key={item.to}>
              {item.section && (
                <div style={{
                  fontSize:10, fontWeight:700, textTransform:'uppercase',
                  letterSpacing:'0.1em', color:'var(--muted)',
                  padding:'0 10px', margin:'14px 0 6px',
                }}>
                  {item.section}
                </div>
              )}
              <NavLink
                to={item.to}
                end={item.end}
                style={({ isActive }) => ({
                  display:'flex', alignItems:'center', gap:10,
                  padding:'9px 10px', borderRadius:12,
                  fontSize:13, fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--p)' : 'var(--muted)',
                  background: isActive ? 'rgba(91,141,239,0.1)' : 'transparent',
                  textDecoration:'none', transition:'all 0.15s',
                  border:'none', width:'100%',
                })}
              >
                <SvgIcon name={item.icon} />
                {item.label}
              </NavLink>
            </React.Fragment>
          ))}

          {/* Footer */}
          <div style={{ marginTop:'auto', paddingTop:12, borderTop:'1px solid var(--border)' }}>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--text)', padding:'0 10px' }}>{user?.name}</div>
            <div style={{ fontSize:12, color:'var(--muted)', padding:'2px 10px 10px' }}>{user?.email}</div>
            <button onClick={handleLogout} style={{
              display:'flex', alignItems:'center', gap:7, fontSize:12.5, fontWeight:600,
              color:'var(--red)', cursor:'pointer', padding:'7px 10px', borderRadius:10,
              border:'none', background:'none', fontFamily:'inherit', width:'100%',
              transition:'background 0.15s',
            }}>
              <SvgIcon name="logout" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex:1, overflowY:'auto', padding:'28px 28px', background:'var(--bg)', position:'relative' }}>
          <Routes>
            <Route index                   element={<OverviewPage />} />
            <Route path="marketplace"      element={<MarketplacePage />} />
            <Route path="orders"           element={<OrdersPage />} />
            <Route path="messages"         element={<MessagesPage />} />
            <Route path="my-services"      element={<MyServicesPage />} />
            <Route path="profile"          element={<ProfilePage />} />
            <Route path="admin"            element={<AdminPage />} />
            <Route path="admin/reports"   element={<AdminReportsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
