import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const featureCards = [
  {
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5m-9-6h.008v.008H12V12zm0 3h.008v.008H12v-.008zm0 3h.008v.008H12v-.008zm-3-6h.008v.008H9V12zm0 3h.008v.008H9v-.008zm0 3h.008v.008H9v-.008zm6-6h.008v.008h-.008V12zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>,
    title: 'Event Discovery',
    desc: 'Browse all campus events in one unified feed — from faculty workshops to inter-university competitions. Filter by date, type, or faculty so you never miss the things that matter most to you.',
    ai: false,
  },
  {
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
    title: 'Club Management',
    desc: 'Find and join university clubs with ease — from tech societies to cultural groups. Club leaders can post updates, manage memberships, and communicate directly through the platform.',
    ai: false,
  },
  {
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
    title: 'AI Event Chatbot',
    desc: 'Have a question about an upcoming event? The UniSync AI chatbot answers instantly — venue details, schedules, registration links, dress codes — so you\'re always informed without hunting for information.',
    ai: true,
  },
  {
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>,
    title: 'Clash Alerts',
    desc: 'UniSync automatically checks your full academic timetable against every event you want to attend. If there\'s a clash, you\'re warned immediately so you can choose what matters without missing a graded session.',
    ai: false,
  },
  {
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" /></svg>,
    title: 'Calendar Integration',
    desc: 'One tap syncs any campus event directly into your personal calendar — Google, Apple, or Outlook. Your academic schedule and social life merge into one unified view, so planning your week is always easy.',
    ai: false,
  },
  {
    icon: <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
    title: 'Social Matching',
    desc: 'UniSync\'s AI analyses your interests, faculty, and year to introduce you to students who share your passions — making it genuinely easy to find your people and build friendships that last beyond graduation.',
    ai: true,
  },
];

const FeatureSocialEvents = () => {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#fdf7fb', color: '#1a0010', overflowX: 'hidden' }}>

      {/* HERO */}
      <section style={{
        position: 'relative', minHeight: '520px', display: 'flex', alignItems: 'center', overflow: 'hidden',
        background: 'linear-gradient(135deg,#1a0010 0%,#500724 55%,#831843 100%)'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(244,114,182,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(244,114,182,.06) 1px,transparent 1px)',
          backgroundSize: '48px 48px'
        }} />
        <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: 'rgba(219,39,119,.2)', top: -80, right: -60, filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', background: 'rgba(251,146,60,.08)', bottom: -60, left: 80, filter: 'blur(80px)' }} />

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
                background: 'rgba(244,114,182,.15)', border: '1px solid rgba(244,114,182,.35)',
                color: '#fbcfe8', fontSize: '.75rem', fontWeight: 600, letterSpacing: '.08em',
                textTransform: 'uppercase', padding: '6px 14px', borderRadius: 99, marginBottom: 20
              }}>👥 Social & Events</div>

              <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: '3rem', fontWeight: 700, lineHeight: 1.12, color: '#fff', letterSpacing: '-.03em', marginBottom: 18 }}>
                Your campus life,<br /><span style={{ color: '#f472b6' }}>fully connected</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: 36 }}>
                Discover events, join clubs, and connect with peers who share your interests — with AI that keeps your social life perfectly in sync with your academic schedule.
              </p>
              <div style={{ display: 'flex', gap: 36 }}>
                {[['6', 'Core Features'], ['AI', 'Matched'], ['0', 'Clashes']].map(([num, label], i) => (
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

            {/* Events Mockup */}
            <div style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 20, padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '.9rem', fontWeight: 600, color: '#fff' }}>Upcoming Events For You</div>
                <div style={{ background: 'rgba(244,114,182,.2)', border: '1px solid rgba(244,114,182,.35)', color: '#f472b6', fontSize: '.72rem', fontWeight: 600, padding: '3px 10px', borderRadius: 99 }}>3 New Matches</div>
              </div>

              {[
                { emoji: '🎭', bg: 'rgba(244,114,182,.15)', name: 'UniSync Drama Night — Auditorium A', meta: 'Tomorrow · 6:30 PM · 84 attending', btn: 'Remind Me' },
                { emoji: '🏆', bg: 'rgba(251,191,36,.12)', name: 'Inter-Faculty Hackathon 2025', meta: 'Sat 14 Dec · 9:00 AM · 210 attending', btn: 'Save' },
                { emoji: '🎵', bg: 'rgba(99,102,241,.15)', name: 'Campus Music Fest — Open Grounds', meta: 'Sun 15 Dec · 4:00 PM · 320 attending', btn: 'Going' },
              ].map(({ emoji, bg, name, meta, btn }, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 14, padding: 14, marginBottom: 10, display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>{emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '.9rem', fontWeight: 600, color: '#fff', marginBottom: 3 }}>{name}</div>
                    <div style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.45)' }}>{meta}</div>
                  </div>
                  <button style={{ background: 'linear-gradient(135deg,#9d174d,#db2777)', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 14px', fontSize: '.78rem', fontWeight: 600, cursor: 'pointer', flexShrink: 0, fontFamily: "'DM Sans', sans-serif" }}>{btn}</button>
                </div>
              ))}

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(251,146,60,.1)', border: '1px solid rgba(251,146,60,.25)', borderRadius: 10, padding: '10px 14px', marginTop: 4 }}>
                <svg style={{ width: 16, height: 16, color: '#fbbf24', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.65)' }}><strong style={{ color: '#fbbf24' }}>Clash Detected:</strong> Music Fest overlaps with DS Practicals (3:00–5:00 PM).</span>
              </div>

              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,.07)' }}>
                <div style={{ fontSize: '.75rem', fontWeight: 600, color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 12 }}>✦ AI Social Matches For You</div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {[['😊', 'rgba(244,114,182,.25)', 'Nethmi · CS Y2'], ['😎', 'rgba(99,102,241,.25)', 'Ranuka · IT Y2'], ['🤓', 'rgba(52,211,153,.25)', 'Asel · IS Y3']].map(([emoji, bg, name]) => (
                    <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.08)', borderRadius: 99, padding: '6px 12px 6px 6px' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.85rem' }}>{emoji}</div>
                      <span style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.7)' }}>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-block', fontSize: '.75rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#db2777', marginBottom: 12 }}>What's Included</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: '2rem', fontWeight: 700, letterSpacing: '-.02em', color: '#1a0010', marginBottom: 14 }}>Everything for your campus social life</h2>
          <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: 540, margin: '0 auto', lineHeight: 1.75 }}>From event discovery to AI social matching — UniSync keeps you plugged into campus life without ever clashing with your studies.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {featureCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              style={{ background: '#fff', border: '1px solid #fce7f3', borderRadius: 20, padding: 32 }}
            >
              <div style={{ height: 3, background: 'linear-gradient(90deg,#db2777,#f472b6)', borderRadius: 99, marginBottom: 28, width: 40 }} />
              <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg,#831843,#db2777)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 8px 20px rgba(219,39,119,.25)' }}>
                <span style={{ width: 24, height: 24, color: '#fff' }}>{card.icon}</span>
              </div>
              {card.ai && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'linear-gradient(90deg,#fce7f3,#fbcfe8)', color: '#9d174d', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 99, marginBottom: 12 }}>✦ AI Powered</div>
              )}
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.05rem', fontWeight: 600, color: '#1a0010', marginBottom: 10 }}>{card.title}</h3>
              <p style={{ fontSize: '.875rem', color: '#64748b', lineHeight: 1.75, margin: 0 }}>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COMMUNITY BAND */}
      <section style={{ background: 'linear-gradient(135deg,#1a0010,#500724)', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', fontSize: '.75rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#f472b6', marginBottom: 12 }}>Community First</div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: 14 }}>Your university experience, fully connected</h2>
            <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '1rem', lineHeight: 1.75, marginBottom: 28 }}>
              From freshers' week to finals — UniSync's social layer keeps you plugged into campus life at every stage of your degree, without ever clashing with what matters academically.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                'Interest-based recommendations for clubs & societies',
                'AI chatbot answers event queries in seconds',
                'Automatic clash detection with your academic timetable',
                'One-tap sync to Google, Apple & Outlook calendars',
                'Find peers with shared interests through AI Social Matching',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, color: 'rgba(255,255,255,.75)', fontSize: '.92rem', lineHeight: 1.6 }}>
                  <span style={{ width: 24, height: 24, borderRadius: 7, background: 'rgba(244,114,182,.2)', border: '1px solid rgba(244,114,182,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <svg style={{ width: 13, height: 13, color: '#f472b6' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 16, padding: 24 }}>
            <p style={{ fontSize: '.88rem', color: 'rgba(255,255,255,.5)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 600, fontFamily: "'Sora', sans-serif" }}>Join the community</p>
            <Link to="/register" style={{
              display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg,#9d174d,#db2777)',
              color: '#fff', borderRadius: 12, fontWeight: 600, textDecoration: 'none', fontSize: '.95rem',
              boxShadow: '0 8px 24px rgba(219,39,119,.35)'
            }}>
              Get Started Free →
            </Link>
            <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.35)', marginTop: 12 }}>Already have an account? <Link to="/login" style={{ color: '#f472b6', textDecoration: 'none' }}>Log in</Link></p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FeatureSocialEvents;
