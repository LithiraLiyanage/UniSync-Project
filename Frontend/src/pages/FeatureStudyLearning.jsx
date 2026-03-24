import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const featureCards = [
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.966 8.966 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: 'Study Assistant',
    desc: 'An intelligent AI-powered assistant that answers your academic questions, explains complex concepts, and helps you tackle assignments — available 24/7 from your phone or laptop.',
    ai: false,
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'Module Dashboard',
    desc: 'A centralised command centre for all your course information. View timetables, assignment deadlines, lecturer announcements, and module resources in one clean, organised interface.',
    ai: false,
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
    title: 'Smart Notifications',
    desc: 'Never miss a lecture or deadline again. Intelligent alerts are delivered at exactly the right time — for upcoming lectures, exam dates, assignment submissions, and announcements.',
    ai: false,
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: 'Resources Library',
    desc: 'One-tap access to everything you need: past exam papers, lecture slides, practicals, mind maps, and curated study guides — organised by module and always current.',
    ai: false,
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
    title: 'AI Progress Tracker',
    desc: 'Our AI engine monitors your study patterns in real-time, identifying which modules need more attention and where you\'re excelling — giving you a clear picture of your academic progress.',
    ai: true,
  },
  {
    icon: (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    title: 'Study Recommendations',
    desc: 'AI-driven suggestions that adapt to your learning style, upcoming exams, and performance gaps — delivering a personalised daily study roadmap that evolves with you.',
    ai: true,
  },
];

const FeatureStudyLearning = () => {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8f9ff', color: '#0d0b1e', overflowX: 'hidden' }}>

      {/* HERO */}
      <section style={{
        position: 'relative', minHeight: '520px', display: 'flex', alignItems: 'center', overflow: 'hidden',
        background: 'linear-gradient(135deg,#0d0b1e 0%,#1e1b4b 50%,#312e81 100%)'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(99,102,241,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,.07) 1px,transparent 1px)',
          backgroundSize: '48px 48px'
        }} />
        <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'rgba(99,102,241,.2)', top: -100, right: -100, filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(6,182,212,.1)', bottom: -80, left: 100, filter: 'blur(80px)' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1100, margin: '0 auto', padding: '80px 48px', width: '100%' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,.55)', fontSize: '.85rem', textDecoration: 'none', marginBottom: 32 }}>
            <svg style={{ width: 14, height: 14 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(99,102,241,.2)', border: '1px solid rgba(99,102,241,.4)',
                color: '#a5b4fc', fontSize: '.75rem', fontWeight: 600, letterSpacing: '.08em',
                textTransform: 'uppercase', padding: '6px 14px', borderRadius: 99, marginBottom: 20
              }}>📚 Study & Learning</div>

              <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: '3rem', fontWeight: 700, lineHeight: 1.12, color: '#fff', letterSpacing: '-.03em', marginBottom: 18 }}>
                Your smart academic<br /><span style={{ color: '#818cf8' }}>companion</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,.62)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: 36 }}>
                AI-powered study tools, progress tracking, module dashboards and curated resources — everything you need to stay ahead, all in one place.
              </p>
              <div style={{ display: 'flex', gap: 36 }}>
                {[['6', 'Core Features'], ['AI', 'Powered'], ['24/7', 'Available']].map(([num, label], i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    {i > 0 && <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,.12)' }} />}
                    <div>
                      <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.7rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{num}</div>
                      <div style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.45)', marginTop: 4 }}>{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Mockup */}
            <div style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 20, padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg style={{ width: 18, height: 18, color: '#fff' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: '.9rem', fontWeight: 600, color: '#fff' }}>UniSync AI Tracker</div>
                  <div style={{ fontSize: '.73rem', color: '#34d399', marginTop: 1 }}>● Analysing your progress</div>
                </div>
              </div>
              {[
                { label: 'Database Systems', pct: 78, color: 'linear-gradient(90deg,#6366f1,#8b5cf6)' },
                { label: 'Software Engineering', pct: 45, color: 'linear-gradient(90deg,#f59e0b,#ef4444)' },
                { label: 'Networks & Security', pct: 91, color: 'linear-gradient(90deg,#06b6d4,#6366f1)' },
                { label: 'Algorithms', pct: 33, color: 'linear-gradient(90deg,#ef4444,#f59e0b)' },
              ].map(({ label, pct, color }) => (
                <div key={label} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                    <span style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.65)' }}>{label}</span>
                    <span style={{ fontSize: '.82rem', color: 'rgba(255,255,255,.65)' }}>{pct}%</span>
                  </div>
                  <div style={{ height: 7, background: 'rgba(255,255,255,.08)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 99 }} />
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 12, background: 'rgba(99,102,241,.1)', border: '1px solid rgba(99,102,241,.25)', borderRadius: 12, padding: '12px 16px', marginTop: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(99,102,241,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg style={{ width: 16, height: 16, color: '#818cf8' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                  </svg>
                </div>
                <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.65)', lineHeight: 1.6, margin: 0 }}>
                  <strong style={{ color: '#fff' }}>AI Suggestion:</strong> Algorithms needs attention. We found 3 relevant past papers and a verified peer tutor available this week.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 48px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ display: 'inline-block', fontSize: '.75rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#4f46e5', marginBottom: 12 }}>What's Included</div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: '2rem', fontWeight: 700, letterSpacing: '-.02em', color: '#0d0b1e', marginBottom: 14 }}>Everything you need to excel academically</h2>
          <p style={{ fontSize: '1rem', color: '#64748b', maxWidth: 540, margin: '0 auto', lineHeight: 1.75 }}>From AI-powered insights to a full module dashboard — UniSync gives every student the tools to study smarter.</p>
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
              style={{ background: '#fff', border: '1px solid #e8eaf6', borderRadius: 20, padding: 32, cursor: 'default' }}
            >
              <div style={{ height: 3, background: 'linear-gradient(90deg,#4f46e5,#06b6d4)', borderRadius: 99, marginBottom: 28, width: 40 }} />
              <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg,#1e1b4b,#4338ca)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 8px 20px rgba(67,56,202,.25)' }}>
                <span style={{ width: 24, height: 24, color: '#fff' }}>{card.icon}</span>
              </div>
              {card.ai && (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'linear-gradient(90deg,#ede9fe,#ddd6fe)', color: '#5b21b6', fontSize: '.72rem', fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 99, marginBottom: 12 }}>✦ AI Powered</div>
              )}
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: '1.05rem', fontWeight: 600, color: '#0d0b1e', marginBottom: 10 }}>{card.title}</h3>
              <p style={{ fontSize: '.875rem', color: '#64748b', lineHeight: 1.75, margin: 0 }}>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI DEEP DIVE BAND */}
      <section style={{ background: 'linear-gradient(135deg,#0d0b1e,#1e1b4b)', padding: '80px 48px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-block', fontSize: '.75rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: '#818cf8', marginBottom: 12 }}>AI Intelligence</div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: 14 }}>Your AI study partner, always on</h2>
            <p style={{ color: 'rgba(255,255,255,.58)', fontSize: '1rem', lineHeight: 1.75, marginBottom: 28 }}>
              UniSync's AI doesn't just track data — it understands patterns. It spots where you're falling behind, predicts struggles before they happen, and serves personalised suggestions before you even realise you need them.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                'Monitors study time, topic coverage & daily consistency',
                'Flags weak modules before they affect your final grade',
                'Builds personalised daily plans around your timetable',
                'Recommends resources, peer tutors & past papers by topic',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, color: 'rgba(255,255,255,.75)', fontSize: '.92rem', lineHeight: 1.6 }}>
                  <span style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(99,102,241,.3)', border: '1px solid rgba(99,102,241,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <svg style={{ width: 12, height: 12, color: '#818cf8' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 16, padding: 24 }}>
              <p style={{ fontSize: '.88rem', color: 'rgba(255,255,255,.5)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 600 }}>Ready to study smarter?</p>
              <Link to="/register" style={{
                display: 'inline-block', padding: '12px 28px', background: 'linear-gradient(135deg,#4f46e5,#7c3aed)',
                color: '#fff', borderRadius: 12, fontWeight: 600, textDecoration: 'none', fontSize: '.95rem',
                boxShadow: '0 8px 24px rgba(79,70,229,.35)'
              }}>
                Get Started Free →
              </Link>
              <p style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.35)', marginTop: 12 }}>Already have an account? <Link to="/login" style={{ color: '#818cf8', textDecoration: 'none' }}>Log in</Link></p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FeatureStudyLearning;
