import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../utils/useAuth';
import { Card, Button } from '../../../components/UI';
import api from '../../../utils/api';

const StatCard = ({ icon, value, label, change, color }) => (
  <div style={{
    background:'var(--card)', border:'1px solid var(--border)', borderRadius:20,
    padding:22, position:'relative', overflow:'hidden', transition:'all 0.2s',
  }}>
    <div style={{
      position:'absolute', top:0, right:0, width:120, height:120,
      borderRadius:'50%', background:color, opacity:0.12,
      transform:'translate(30%, -30%)',
    }} />
    <div style={{ fontSize:28, marginBottom:10 }}>{icon}</div>
    <div style={{ fontFamily:"'Sora',sans-serif", fontSize:28, fontWeight:800, color:'var(--text2)' }}>{value}</div>
    <div style={{ fontSize:13, color:'var(--muted)', marginTop:4 }}>{label}</div>
    {change && <div style={{ fontSize:12, color:'var(--green)', marginTop:6, fontWeight:600 }}>{change}</div>}
  </div>
);

const BarChart = ({ data }) => {
  const max = Math.max(...data.map(d => d.value), 1);
  const months = ['Aug','Sep','Oct','Nov','Dec','Jan'];
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:8, height:120, padding:'0 4px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
          <div style={{
            width:'100%', background:'linear-gradient(to top,var(--p),rgba(91,141,239,0.3))',
            borderRadius:'6px 6px 0 0', transition:'height 0.5s ease',
            height: `${Math.round((d.value / max) * 100) + 5}px`,
            minHeight:8, position:'relative', cursor:'default',
          }}
            title={`Rs.${d.value}/=`}
          />
          <span style={{ fontSize:9, color:'var(--muted)' }}>{months[i % 6]}</span>
        </div>
      ))}
    </div>
  );
};

const DUMMY_BARS = [
  { value:45 },{ value:80 },{ value:60 },{ value:120 },{ value:95 },{ value:155 },
];

export default function OverviewPage() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);

  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  useEffect(() => {
    refreshUser().catch(() => {});
    // fetch seller stats
    if (user?._id) {
      api.get(`/api/users/${user._id}/stats`).then(r => setStats(r.data)).catch(() => {});
      api.get('/api/orders?limit=5').then(r => setRecentOrders(r.data.orders || [])).catch(() => {});
    }
  }, []);

  const STATUS_LABEL = {
    pending:'Pending', in_progress:'In Progress',
    delivered:'Delivered', completed:'Completed', cancelled:'Cancelled',
  };
  const STATUS_COLOR = {
    pending:'var(--acc)', in_progress:'var(--p)',
    delivered:'var(--purple)', completed:'var(--green)', cancelled:'var(--red)',
  };

  return (
    <div className="animate-up">
      {/* Welcome banner */}
      <div style={{
        background:'linear-gradient(135deg,rgba(91,141,239,0.15),rgba(58,111,216,0.1))',
        border:'1px solid rgba(91,141,239,0.15)', borderRadius:22,
        padding:'24px 28px', marginBottom:24,
        display:'flex', alignItems:'center', justifyContent:'space-between',
        position:'relative', overflow:'hidden',
      }}>
        <div style={{
          position:'absolute', right:-40, top:-40, width:200, height:200,
          borderRadius:'50%', background:'radial-gradient(circle,rgba(91,141,239,0.15),transparent 70%)',
          pointerEvents:'none',
        }} />
        <div>
          <h2 style={{ fontFamily:"'Sora',sans-serif", fontWeight:800, fontSize:22, color:'var(--text2)', marginBottom:6 }}>
            {greet}, {user?.name}! 👋
          </h2>
          <p style={{ color:'var(--muted)', fontSize:14 }}>Here's what's happening on your marketplace today.</p>
        </div>
        <Button onClick={() => navigate('/earn/marketplace')} variant="secondary">
          Browse Services →
        </Button>
      </div>

      {/* Stats grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 }}>
        <StatCard icon="📦" value={stats?.totalOrders ?? '—'} label="Total Orders"
          change={stats ? `${stats.completedOrders} completed` : undefined}
          color="rgba(91,141,239,1)" />
        <StatCard icon="💰" value={stats ? `Rs.${stats.totalEarned}/=` : 'Rs.0/='}
          label="Total Earned" color="rgba(34,211,160,1)" />
        <StatCard icon="⭐" value={user?.rating?.toFixed(1) || '—'}
          label="Avg Rating"
          change={user?.totalReviews ? `${user.totalReviews} reviews` : 'No reviews yet'}
          color="rgba(244,185,66,1)" />
        <StatCard icon="👛" value={`Rs.${user?.walletBalance?.toFixed(2) || '0.00'}/=`}
          label="Wallet Balance" color="rgba(167,139,250,1)" />
      </div>

      {/* Charts + Recent orders */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:24 }}>
        <Card>
          <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:16, color:'var(--text2)', marginBottom:4 }}>Monthly Earnings</div>
          <div style={{ fontSize:12, color:'var(--muted)', marginBottom:16 }}>Revenue over the last 6 months</div>
          <BarChart data={DUMMY_BARS} />
        </Card>

        <Card>
          <div style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:16, color:'var(--text2)', marginBottom:4 }}>Quick Actions</div>
          <div style={{ fontSize:12, color:'var(--muted)', marginBottom:20 }}>Get started quickly</div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <Button fullWidth onClick={() => navigate('/earn/my-services')} variant="primary" size="sm">
              ＋ Create a Service
            </Button>
            <Button fullWidth onClick={() => navigate('/earn/marketplace')} variant="secondary" size="sm">
              🛒 Browse Marketplace
            </Button>
            <Button fullWidth onClick={() => navigate('/earn/orders')} variant="secondary" size="sm">
              📦 View My Orders
            </Button>
            <Button fullWidth onClick={() => navigate('/earn/messages')} variant="secondary" size="sm">
              💬 Messages
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent orders */}
      <Card style={{ padding:0, overflow:'hidden' }}>
        <div style={{ padding:'18px 22px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <h3 style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:16, color:'var(--text2)' }}>Recent Orders</h3>
          <Button size="sm" variant="ghost" onClick={() => navigate('/earn/orders')}>View all →</Button>
        </div>
        {recentOrders.length === 0 ? (
          <div style={{ padding:'40px 22px', textAlign:'center', color:'var(--muted)' }}>
            <div style={{ fontSize:32, marginBottom:8 }}>📭</div>
            <p>No orders yet. <span style={{ color:'var(--p)', cursor:'pointer' }} onClick={() => navigate('/earn/marketplace')}>Browse the marketplace!</span></p>
          </div>
        ) : (
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'var(--card2)' }}>
                {['Service','Seller','Date','Status','Price'].map(h => (
                  <th key={h} style={{ padding:'10px 16px', textAlign:'left', fontSize:11.5, fontWeight:600, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(o => (
                <tr key={o._id} style={{ borderTop:'1px solid var(--border)' }}>
                  <td style={{ padding:'12px 16px', fontSize:13, fontWeight:600, color:'var(--text)' }}>{o.service?.title || '—'}</td>
                  <td style={{ padding:'12px 16px', fontSize:13, color:'var(--muted)' }}>{o.seller?.name}</td>
                  <td style={{ padding:'12px 16px', fontSize:13, color:'var(--muted)' }}>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding:'12px 16px' }}>
                    <span style={{
                      padding:'3px 10px', borderRadius:20, fontSize:11.5, fontWeight:700,
                      background:`${STATUS_COLOR[o.status]}22`, color:STATUS_COLOR[o.status],
                    }}>
                      {STATUS_LABEL[o.status]}
                    </span>
                  </td>
                  <td style={{ padding:'12px 16px', fontSize:13, fontWeight:700, color:'var(--p)' }}>Rs.{o.price}/=</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
