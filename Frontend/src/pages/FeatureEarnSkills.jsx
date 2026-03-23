import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const featureCards = [
  {
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.966 8.966 0 00-6 2.292m0-14.25v14.25" /></svg>,
    title: 'Selling Educational Resources',
    desc: 'List and trade second-hand textbooks, handwritten revision notes, practical lab guides, mind maps, and study summaries. Earn from what you\'ve already created — and help peers at the same time.',
    ai: false, warning: false,
  },
  {
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>,
    title: 'Skills-Based Services',
    desc: 'Offer your expertise as a service — peer tutoring, coding guidance, subject explanations, or a subject-specific helpdesk. Students with niche knowledge can turn it into a sustainable side income.',
    ai: false, warning: false,
  },
  {
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>,
    title: 'Campus Gigs & Freelance',
    desc: 'Browse and post short-term campus jobs — event setups, photography, translation, graphic design, and more. Perfect for building your CV and earning between lectures.',
    ai: false, warning: false,
  },
  {
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>,
    title: 'Academic Integrity Policy',
    desc: 'Cheating services — including assignment completion, essay writing, or exam assistance — are strictly prohibited. UniSync enforces this through smart keyword filters, peer reporting tools, and automated content checks.',
    ai: false, warning: true,
  },
  {
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" /></svg>,
    title: 'Booking & Tracking',
    desc: 'Seamlessly manage all orders and service bookings in one place. Whether you\'re a buyer or seller, track the status of each transaction, session, or delivery from start to finish.',
    ai: false, warning: false,
  },
  {
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>,
    title: 'Ratings & Reviews',
    desc: 'After every transaction, both parties leave honest ratings and reviews. This builds a culture of accountability and trust — rewarding quality sellers and helping buyers make confident decisions.',
    ai: false, warning: false,
  },
  {
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
    title: 'Verified Accounts',
    desc: 'Every student on the platform goes through university verification before they can buy or sell. This ensures a secure, reliable marketplace where the community can transact with genuine confidence.',
    ai: false, warning: false,
  },
  {
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
    title: 'AI Recommendations',
    desc: 'Our AI analyses your enrolled modules, study patterns, and needs — then connects you with the most relevant listings, tutors, and earning opportunities automatically.',
    ai: true, warning: false,
  },
];

const FeatureEarnSkills = () => {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f7fdf9', color: '#0a1a0f', overflowX: 'hidden' }}>

      {/* HERO */}
      <section style={{
        position: 'relative', minHeight: '520px', display: 'flex', alignItems: 'center', overflow: 'hidden',
        background: 'linear-gradient(135deg,#022c22 0%,#064e3b 55%,#065f46 100%)'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(52,211,153,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(52,211,153,.06) 1px,transparent 1px)',
          backgroundSize: '48px 48px'
        }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'rgba(16,185,129,.18)', top: -80, right: -60, filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', background: 'rgba(5,150,105,.12)', bottom: -60, left: 80, filter: 'blur(80px)' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', padding: '80px 48px', width: '100%' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,.5)', fontSize: '.85rem', textDecoration: 'none', marginBottom: 32 }}>
            <svg style={{ width: 14, height: 14 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(52,211,153,.15)', border: '1px solid rgba(52,211,153,.35)',
                color: '#6ee7b7', fontSize: '.75rem', fontWeight: 600, letterSpacing: '.08em',
                textTransform: 'uppercase', padding: '6px 14px', borderRadius: 99, marginBottom: 20
              }}>💰 Earn & Skills</div>

              <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: '3rem', fontWeight: 700, lineHeight: 1.12, color: '#fff', letterSpacing: '-.03em', marginBottom: 18 }}>
                Turn your knowledge<br />into <span style={{ color: '#34d399' }}>income</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: 36 }}>
                Buy, sell, and trade educational resources with verified peers. Offer your skills as services, find campus gigs, and build your professional profile — all within a trusted student community.
              </p>
              <div style={{ display: 'flex', gap: 36 }}>
                {[['7', 'Core Features'], ['✓', 'Verified Only'], ['AI', 'Matched']].map(([num, label], i) => (
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

            {/* Marketplace Mockup */}
            <div style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 20, padding: 24 }}>
              <div style={{ fontSize: '.85rem', fontWeight: 600, color: 'rgba(255,255,255,.6)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.06em', fontFamily: "'Sora', sans-serif" }}>Live Listings</div>
              {[
                { emoji: '📘', title: '2nd Year Database Notes + Past Papers', meta: 'Seller: Kasun M. · CS Year 3', price: 'LKR 350' },
                { emoji: '🧑‍💻', title: 'Python & Algorithm Tutoring Sessions', meta: 'Tutor: Dilani P. · IS Year 4', price: 'LKR 800/hr' },
                { emoji: '📝', title: 'Networks Mind Maps – All Topics', meta: 'Seller: Akila S. · IT Year 2', price: 'LKR 200' },
              ].map(({ emoji, title, meta, price }, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 12, padding: 14, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(52,211,153,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>{emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '.88rem', fontWeight: 500, color: '#fff', marginBottom: 3 }}>
                      {title} <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(52,211,153,.15)', border: '1px solid rgba(52,211,153,.3)', color: '#34d399', fontSize: '.68rem', fontWeight: 600, padding: '2px 8px', borderRadius: 99, marginLeft: 4 }}>✓ Verified</span>
                    </div>
                    <div style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.45)' }}>{meta}</div>
                  </div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '.95rem', fontWeight: 700, color: '#34d399', flexShrink: 0 }}>{price}</div>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 12 }}>
                <span style={{ color: '#f59e0b', fontSize: '.85rem' }}>★★★★★</span>
                <span style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.5)', marginLeft: 4 }}>4.9 avg rating across 230+ transactions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-block', fontSize: '.75rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#059669', marginBottom: 12 }}>What's Included</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: '2rem', fontWeight: 700, letterSpacing: '-.02em', color: '#0a1a0f', marginBottom: 14 }}>Everything for the student marketplace</h2>
          <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: 540, margin: '0 auto', lineHeight: 1.75 }}>From selling your notes to offering tutoring services — with verified accounts and AI to connect the right people.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {featureCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              style={{
                background: card.warning ? '#fff5f5' : '#fff',
                border: `1px solid ${card.warning ? '#fecaca' : '#d1fae5'}`,
                borderRadius: 20, padding: 32,
                gridColumn: i === 7 ? '1 / 3' : undefined,
              }}
            >
              <div style={{ height: 3, background: card.warning ? 'linear-gradient(90deg,#dc2626,#f87171)' : 'linear-gradient(90deg,#059669,#06b6d4)', borderRadius: 99, marginBottom: 28, width: 40 }} />
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: card.warning ? 'linear-gradient(135deg,#7f1d1d,#dc2626)' : 'linear-gradient(135deg,#064e3b,#059669)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
                boxShadow: card.warning ? '0 8px 20px rgba(220,38,38,.2)' : '0 8px 20px rgba(5,150,105,.25)'
              }}>
                <span style={{ width: 24, height: 24, color: '#fff' }}>{card.icon}</span>
              </div>
              {card.ai && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'linear-gradient(90deg,#d1fae5,#a7f3d0)', color: '#065f46', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 99, marginBottom: 12 }}>✦ AI Powered</div>
              )}
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.05rem', fontWeight: 600, color: card.warning ? '#991b1b' : '#0a1a0f', marginBottom: 10 }}>{card.title}</h3>
              <p style={{ fontSize: '.875rem', color: '#64748b', lineHeight: 1.75, margin: 0 }}>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INTEGRITY BAND */}
      <section style={{ background: 'linear-gradient(135deg,#022c22,#064e3b)', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', fontSize: '.75rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#34d399', marginBottom: 12 }}>Academic Integrity</div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: 14 }}>A marketplace built on trust</h2>
            <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '1rem', lineHeight: 1.75, marginBottom: 28 }}>UniSync takes academic integrity seriously. Here's how we enforce what's allowed — and what isn't.</p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { green: true, title: 'Allowed: Tutoring & Guidance', desc: 'Helping peers understand topics, explaining concepts, coding walkthroughs — all permitted and encouraged.' },
                { green: true, title: 'Allowed: Resource Sharing', desc: 'Selling your own notes, mind maps, past paper guides, and study summaries you\'ve legitimately created.' },
                { green: false, title: 'Forbidden: Assignment Completion', desc: 'Writing assignments, doing exams, or completing coursework on behalf of another student is strictly banned and reportable.' },
              ].map(({ green, title, desc }, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: green ? 'rgba(52,211,153,.15)' : 'rgba(239,68,68,.15)', border: `1px solid ${green ? 'rgba(52,211,153,.3)' : 'rgba(239,68,68,.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg style={{ width: 18, height: 18, color: green ? '#34d399' : '#ef4444' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      {green
                        ? <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        : <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />}
                    </svg>
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '.88rem', color: '#fff', marginBottom: 3 }}>{title}</strong>
                    <span style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.5)', lineHeight: 1.5 }}>{desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 16, padding: 24 }}>
            <p style={{ fontSize: '.88rem', color: 'rgba(255,255,255,.5)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 600, fontFamily: "'Sora', sans-serif" }}>Ready to start earning?</p>
            <Link to="/register" style={{
              display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg,#059669,#34d399)',
              color: '#fff', borderRadius: 12, fontWeight: 600, textDecoration: 'none', fontSize: '.95rem',
              boxShadow: '0 8px 24px rgba(5,150,105,.35)'
            }}>
              Join the Marketplace →
            </Link>
            <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.35)', marginTop: 12 }}>Already have an account? <Link to="/login" style={{ color: '#34d399', textDecoration: 'none' }}>Log in</Link></p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FeatureEarnSkills;
