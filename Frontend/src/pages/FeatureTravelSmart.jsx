import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const featureCards = [
  {
    num: '01',
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>,
    title: 'Route Planning',
    desc: 'Smart, personalised route suggestions based on your class schedule, destination, and real-time shuttle availability. UniSync calculates the fastest combination of routes and walking times so you always arrive on time.',
    live: false,
  },
  {
    num: '02',
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>,
    title: 'Live Shuttle Tracking',
    desc: 'See exactly where your shuttle is right now on an interactive map — updated every few seconds via GPS. Get a precise estimated arrival time so you know whether to walk to the stop or take your time finishing that coffee.',
    live: true,
  },
  {
    num: '03',
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>,
    title: 'Timely Notifications',
    desc: 'Smart alerts notify you when your shuttle is approaching your stop, when a route is running late, or when there\'s been a last-minute schedule change. Customise how early you want to be notified — 5, 10, or 15 minutes.',
    live: false,
  },
  {
    num: '04',
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>,
    title: 'Travel Alerts',
    desc: 'Instant push notifications for any travel disruptions — route cancellations, diversions due to campus events, adverse weather impacts, or sudden schedule overhauls. You\'ll always be the first to know.',
    live: false,
  },
];

const FeatureTravelSmart = () => {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8f7ff', color: '#0e0a2e', overflowX: 'hidden' }}>

      {/* HERO */}
      <section style={{
        position: 'relative', minHeight: '520px', display: 'flex', alignItems: 'center', overflow: 'hidden',
        background: 'linear-gradient(135deg,#150b35 0%,#2e1065 55%,#4c1d95 100%)'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(167,139,250,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,.06) 1px,transparent 1px)',
          backgroundSize: '48px 48px'
        }} />
        <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: 'rgba(124,58,237,.2)', top: -100, right: -80, filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(6,182,212,.1)', bottom: -60, left: 60, filter: 'blur(80px)' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', padding: '80px 48px', width: '100%' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,.5)', fontSize: '.85rem', textDecoration: 'none', marginBottom: 32 }}>
            <svg style={{ width: 14, height: 14 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(167,139,250,.15)', border: '1px solid rgba(167,139,250,.35)', color: '#c4b5fd', fontSize: '.75rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', padding: '6px 14px', borderRadius: 99 }}>🗺️ Travel Smart</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(239,68,68,.15)', border: '1px solid rgba(239,68,68,.4)', color: '#fca5a5', fontSize: '.78rem', fontWeight: 600, padding: '5px 14px', borderRadius: 99 }}>
                  <span style={{ width: 7, height: 7, background: '#ef4444', borderRadius: '50%', animation: 'pulse 1.2s infinite', display: 'inline-block' }} />
                  LIVE
                </div>
              </div>

              <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: '3rem', fontWeight: 700, lineHeight: 1.12, color: '#fff', letterSpacing: '-.03em', marginBottom: 18 }}>
                Never miss your<br /><span style={{ color: '#a78bfa' }}>shuttle</span> again
              </h1>
              <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: 36 }}>
                Real-time GPS shuttle tracking, smart route planning, and instant travel alerts — all designed to make getting around campus effortless.
              </p>
              <div style={{ display: 'flex', gap: 36 }}>
                {[['4', 'Core Features'], ['Live', 'GPS Tracking'], ['3s', 'Update Rate']].map(([num, label], i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    {i > 0 && <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,.1)' }} />}
                    <div>
                      <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.7rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{num}</div>
                      <div style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.42)', marginTop: 4 }}>{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Mockup */}
            <div style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 20, overflow: 'hidden' }}>
              <div style={{ height: 220, position: 'relative', background: 'linear-gradient(135deg,rgba(124,58,237,.1),rgba(6,182,212,.08))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(167,139,250,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,.05) 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
                <svg viewBox="0 0 400 220" fill="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                  <path d="M40 170 Q120 110 200 130 Q280 150 360 90" stroke="rgba(255,255,255,.08)" strokeWidth="14" strokeLinecap="round" fill="none" />
                  <path d="M40 170 Q120 110 200 130 Q280 150 360 90" stroke="url(#rg2)" strokeWidth="2.5" strokeDasharray="8 5" strokeLinecap="round" fill="none" />
                  <circle cx="40" cy="170" r="8" fill="rgba(167,139,250,.3)" stroke="#a78bfa" strokeWidth="2" />
                  <circle cx="40" cy="170" r="4" fill="#a78bfa" />
                  <circle cx="360" cy="90" r="8" fill="rgba(6,182,212,.3)" stroke="#06b6d4" strokeWidth="2" />
                  <circle cx="360" cy="90" r="4" fill="#06b6d4" />
                  <circle cx="205" cy="128" r="20" fill="rgba(124,58,237,.2)" stroke="rgba(167,139,250,.4)" strokeWidth="1.5" />
                  <circle cx="205" cy="128" r="12" fill="url(#bg2)" />
                  <text x="199" y="133" fontSize="12" fill="white">🚌</text>
                  <defs>
                    <linearGradient id="rg2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient>
                    <linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7c3aed" /><stop offset="100%" stopColor="#a78bfa" /></linearGradient>
                  </defs>
                </svg>
              </div>
              <div style={{ padding: '18px 20px', background: 'rgba(0,0,0,.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.5)' }}>Route</div>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '.95rem', fontWeight: 600, color: '#fff' }}>Main Gate → Faculty Block C</div>
                  </div>
                  <div style={{ background: 'rgba(52,211,153,.2)', border: '1px solid rgba(52,211,153,.4)', color: '#34d399', padding: '4px 12px', borderRadius: 99, fontSize: '.8rem', fontWeight: 600 }}>ETA: 4 min</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                  <div><div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.5)' }}>Seats Available</div><div style={{ fontFamily: "'Sora', sans-serif", fontSize: '.95rem', fontWeight: 600, color: '#fff' }}>12 / 40</div></div>
                  <div><div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.5)' }}>Last Updated</div><div style={{ fontFamily: "'Sora', sans-serif", fontSize: '.82rem', fontWeight: 600, color: '#fff' }}>3 sec ago</div></div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.25)', borderRadius: 12, padding: '12px 16px', margin: '0 16px 16px' }}>
                <svg style={{ width: 16, height: 16, color: '#ef4444', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <span style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.65)', lineHeight: 1.5 }}><strong style={{ color: '#fff' }}>Travel Alert:</strong> Route B running 8 min late. Alternative: Route A has 14 seats available.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-block', fontSize: '.75rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#7c3aed', marginBottom: 12 }}>What's Included</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: '2rem', fontWeight: 700, letterSpacing: '-.02em', color: '#0e0a2e', marginBottom: 14 }}>Smart travel for every student</h2>
          <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: 540, margin: '0 auto', lineHeight: 1.75 }}>From live GPS tracking to intelligent route planning — UniSync keeps you moving on time, every time.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 28 }}>
          {featureCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              style={{ background: '#fff', border: '1px solid #ede9fe', borderRadius: 20, padding: 36, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0 24px', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ gridRow: '1 / 4', alignSelf: 'start' }}>
                <div style={{ width: 58, height: 58, borderRadius: 16, background: 'linear-gradient(135deg,#4c1d95,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(124,58,237,.25)' }}>
                  <span style={{ width: 26, height: 26, color: '#fff' }}>{card.icon}</span>
                </div>
              </div>
              <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '3.5rem', fontWeight: 700, color: '#f0edff', lineHeight: 1, position: 'absolute', right: 28, top: 24, pointerEvents: 'none' }}>{card.num}</div>
              {card.live && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)', color: '#ef4444', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 99, marginBottom: 10, width: 'fit-content' }}>
                  <span style={{ width: 6, height: 6, background: '#ef4444', borderRadius: '50%', display: 'inline-block' }} />
                  Live GPS
                </div>
              )}
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.1rem', fontWeight: 600, color: '#0e0a2e', marginBottom: 10 }}>{card.title}</h3>
              <p style={{ fontSize: '.9rem', color: '#64748b', lineHeight: 1.75, margin: 0 }}>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LIVE TRACKER BAND */}
      <section style={{ background: 'linear-gradient(135deg,#150b35,#2e1065)', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', fontSize: '.75rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#a78bfa', marginBottom: 12 }}>Live Technology</div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: 14 }}>Real-time. Every second.</h2>
            <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '1rem', lineHeight: 1.75, marginBottom: 28 }}>
              UniSync's live tracking engine connects directly to shuttle GPS hardware, giving you second-by-second location data and accurate ETAs — not estimates from a schedule sheet.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { title: 'GPS Updated Every 3 Seconds', desc: 'Precise location refreshed constantly, not estimated from a timetable.' },
                { title: 'Dynamic ETA Calculation', desc: 'Arrival time recalculates based on live traffic and current shuttle speed.' },
                { title: 'Instant Disruption Alerts', desc: 'Route changes and cancellations pushed to your phone the moment they happen.' },
              ].map(({ title, desc }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: '14px 18px' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(124,58,237,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg style={{ width: 18, height: 18, color: '#a78bfa' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '.9rem', color: '#fff', marginBottom: 2 }}>{title}</strong>
                    <span style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.5)' }}>{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 16, padding: 24 }}>
            <p style={{ fontSize: '.88rem', color: 'rgba(255,255,255,.5)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 600, fontFamily: "'Sora', sans-serif" }}>Start tracking now</p>
            <Link to="/register" style={{
              display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg,#7c3aed,#a78bfa)',
              color: '#fff', borderRadius: 12, fontWeight: 600, textDecoration: 'none', fontSize: '.95rem',
              boxShadow: '0 8px 24px rgba(124,58,237,.35)'
            }}>
              Get Started Free →
            </Link>
            <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.35)', marginTop: 12 }}>Already have an account? <Link to="/login" style={{ color: '#a78bfa', textDecoration: 'none' }}>Log in</Link></p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FeatureTravelSmart;
