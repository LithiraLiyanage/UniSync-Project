import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiPlus, FiSearch, FiFileText, FiX } from 'react-icons/fi';
import api from '../../api/axios';
import toast from 'react-hot-toast';

// Per-theme color definitions for each accent
const COLOR_THEMES = [
  {
    // violet
    badgeHex:       '#7c3aed',
    badgeDark:      '#a78bfa',
    codeBgLight:    '#f5f3ff',
    codeTextLight:  '#5b21b6',
    codeBorderLight:'#ddd6fe',
    codeBgDark:     'rgba(109,40,217,0.18)',
    codeTextDark:   '#c4b5fd',
    codeBorderDark: 'rgba(109,40,217,0.35)',
    topBar:         '#7c3aed',
    iconOpacity:    0.07,
    btnBg:          '#7c3aed',
    btnHover:       '#6d28d9',
  },
  {
    // sky
    badgeHex:       '#0ea5e9',
    badgeDark:      '#38bdf8',
    codeBgLight:    '#f0f9ff',
    codeTextLight:  '#0369a1',
    codeBorderLight:'#bae6fd',
    codeBgDark:     'rgba(14,165,233,0.18)',
    codeTextDark:   '#7dd3fc',
    codeBorderDark: 'rgba(14,165,233,0.35)',
    topBar:         '#0ea5e9',
    iconOpacity:    0.07,
    btnBg:          '#0ea5e9',
    btnHover:       '#0284c7',
  },
  {
    // emerald
    badgeHex:       '#10b981',
    badgeDark:      '#34d399',
    codeBgLight:    '#f0fdf4',
    codeTextLight:  '#065f46',
    codeBorderLight:'#a7f3d0',
    codeBgDark:     'rgba(16,185,129,0.18)',
    codeTextDark:   '#6ee7b7',
    codeBorderDark: 'rgba(16,185,129,0.35)',
    topBar:         '#10b981',
    iconOpacity:    0.07,
    btnBg:          '#10b981',
    btnHover:       '#059669',
  },
  {
    // rose
    badgeHex:       '#f43f5e',
    badgeDark:      '#fb7185',
    codeBgLight:    '#fff1f2',
    codeTextLight:  '#9f1239',
    codeBorderLight:'#fecdd3',
    codeBgDark:     'rgba(244,63,94,0.18)',
    codeTextDark:   '#fda4af',
    codeBorderDark: 'rgba(244,63,94,0.35)',
    topBar:         '#f43f5e',
    iconOpacity:    0.07,
    btnBg:          '#f43f5e',
    btnHover:       '#e11d48',
  },
  {
    // amber
    badgeHex:       '#f59e0b',
    badgeDark:      '#fbbf24',
    codeBgLight:    '#fffbeb',
    codeTextLight:  '#92400e',
    codeBorderLight:'#fde68a',
    codeBgDark:     'rgba(245,158,11,0.18)',
    codeTextDark:   '#fcd34d',
    codeBorderDark: 'rgba(245,158,11,0.35)',
    topBar:         '#f59e0b',
    iconOpacity:    0.07,
    btnBg:          '#f59e0b',
    btnHover:       '#d97706',
  },
  {
    // fuchsia
    badgeHex:       '#d946ef',
    badgeDark:      '#e879f9',
    codeBgLight:    '#fdf4ff',
    codeTextLight:  '#86198f',
    codeBorderLight:'#f5d0fe',
    codeBgDark:     'rgba(217,70,239,0.18)',
    codeTextDark:   '#f0abfc',
    codeBorderDark: 'rgba(217,70,239,0.35)',
    topBar:         '#d946ef',
    iconOpacity:    0.07,
    btnBg:          '#d946ef',
    btnHover:       '#c026d3',
  },
  {
    // teal
    badgeHex:       '#14b8a6',
    badgeDark:      '#2dd4bf',
    codeBgLight:    '#f0fdfa',
    codeTextLight:  '#0f766e',
    codeBorderLight:'#99f6e4',
    codeBgDark:     'rgba(20,184,166,0.18)',
    codeTextDark:   '#5eead4',
    codeBorderDark: 'rgba(20,184,166,0.35)',
    topBar:         '#14b8a6',
    iconOpacity:    0.07,
    btnBg:          '#14b8a6',
    btnHover:       '#0d9488',
  },
  {
    // orange
    badgeHex:       '#f97316',
    badgeDark:      '#fb923c',
    codeBgLight:    '#fff7ed',
    codeTextLight:  '#9a3412',
    codeBorderLight:'#fed7aa',
    codeBgDark:     'rgba(249,115,22,0.18)',
    codeTextDark:   '#fdba74',
    codeBorderDark: 'rgba(249,115,22,0.35)',
    topBar:         '#f97316',
    iconOpacity:    0.07,
    btnBg:          '#f97316',
    btnHover:       '#ea580c',
  },
];

const defaultPapers = [
  { _id: '1', module: { code: 'CS201', moduleName: 'Data Structures' }, year: 2025, semester: 1 },
  { _id: '2', module: { code: 'CS202', moduleName: 'DBMS' }, year: 2024, semester: 1 },
  { _id: '3', module: { code: 'CS203', moduleName: 'OOP' }, year: 2024, semester: 2 },
  { _id: '4', module: { code: 'CS204', moduleName: 'Networks' }, year: 2023, semester: 1 },
  { _id: '5', module: { code: 'CS205', moduleName: 'OS' }, year: 2022, semester: 2 },
  { _id: '6', module: { code: 'CS206', moduleName: 'Math' }, year: 2025, semester: 1 },
];

const PapersPage = ({ isDark = false }) => {
  const [papers, setPapers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPapers(); }, []);

  const fetchPapers = async () => {
    try {
      const res = await api.get('/api/papers');
      setPapers(res.data.data.length === 0 ? defaultPapers : res.data.data);
    } catch {
      toast.error('Failed to load past papers');
      setPapers(defaultPapers);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (paperId) => toast.success('Downloading past paper...');

  const filteredPapers = papers.filter(p => {
    const s = searchTerm.toLowerCase();
    return (p.module?.moduleName || '').toLowerCase().includes(s)
      || (p.module?.code || '').toLowerCase().includes(s)
      || p.year.toString().includes(s);
  });

  // ── Theme tokens (passed in or derived) ──────────────────────
  const t = isDark ? {
    searchBg:       '#0d0d14',
    searchBorder:   '#1f1b33',
    searchText:     '#f3f4f6',
    searchPlaceholder: '#4b5563',
    searchFocusBorder: '#7c3aed',
    cardBg:         '#0d0d14',
    cardBorder:     '#1f1b33',
    cardShadow:     '0 4px 24px rgba(0,0,0,0.4)',
    cardHoverShadow:'0 8px 32px rgba(0,0,0,0.5)',
    titleClr:       '#f3f4f6',
    semBg:          'rgba(244,63,94,0.12)',
    semText:        '#fda4af',
    semBorder:      'rgba(244,63,94,0.3)',
    emptyIcon:      '#4b5563',
    emptyText:      '#6b7280',
    modalBg:        '#0d0d14',
    modalBorder:    '#1f1b33',
    modalTitle:     '#f3f4f6',
    labelClr:       '#9ca3af',
    inputBg:        '#08080f',
    inputBorder:    '#1f1b33',
    inputText:      '#f3f4f6',
    inputFocus:     '#7c3aed',
    dividerClr:     '#1f1b33',
    cancelBg:       '#1f1b33',
    cancelText:     '#9ca3af',
    cancelHover:    '#2d2a3e',
    uploadBtn:      'linear-gradient(135deg, #6d28d9, #7c3aed)',
  } : {
    searchBg:       '#ffffff',
    searchBorder:   '#e2e8f0',
    searchText:     '#1e293b',
    searchPlaceholder: '#94a3b8',
    searchFocusBorder: '#7c3aed',
    cardBg:         '#ffffff',
    cardBorder:     '#e2e8f0',
    cardShadow:     '0 2px 12px rgba(15,23,42,0.07)',
    cardHoverShadow:'0 8px 28px rgba(15,23,42,0.12)',
    titleClr:       '#1e293b',
    semBg:          '#fff1f2',
    semText:        '#be123c',
    semBorder:      '#fecdd3',
    emptyIcon:      '#cbd5e1',
    emptyText:      '#94a3b8',
    modalBg:        '#ffffff',
    modalBorder:    '#e2e8f0',
    modalTitle:     '#0f172a',
    labelClr:       '#64748b',
    inputBg:        '#f8fafc',
    inputBorder:    '#e2e8f0',
    inputText:      '#1e293b',
    inputFocus:     '#7c3aed',
    dividerClr:     '#e2e8f0',
    cancelBg:       '#f1f5f9',
    cancelText:     '#64748b',
    cancelHover:    '#e2e8f0',
    uploadBtn:      'linear-gradient(135deg, #6d28d9, #7c3aed)',
  };

  return (
    <div className="space-y-6 pb-10">

      {/* ── Top Bar ── */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full max-w-sm">
          <FiSearch
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: t.searchPlaceholder }}
          />
          <input
            type="text"
            placeholder="Search by module or year..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-lg w-full focus:outline-none transition-colors text-sm"
            style={{
              background: t.searchBg,
              border: `1px solid ${t.searchBorder}`,
              color: t.searchText,
            }}
            onFocus={e => e.target.style.borderColor = t.searchFocusBorder}
            onBlur={e => e.target.style.borderColor = t.searchBorder}
          />
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="w-full sm:w-auto flex justify-center items-center px-5 py-2.5 rounded-lg font-bold transition-all text-white shadow-sm gap-2 text-sm"
          style={{ background: t.uploadBtn, boxShadow: '0 4px 14px rgba(109,40,217,0.35)' }}
        >
          <FiPlus size={16} /> Upload Paper
        </button>
      </div>

      {/* ── Papers Grid ── */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 rounded-full animate-spin"
            style={{ borderColor: 'rgba(124,58,237,0.15)', borderTopColor: '#7c3aed' }} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPapers.map((p, i) => {
            const theme = COLOR_THEMES[i % COLOR_THEMES.length];
            const badge        = isDark ? theme.badgeDark  : theme.badgeHex;
            const codeBg       = isDark ? theme.codeBgDark       : theme.codeBgLight;
            const codeText     = isDark ? theme.codeTextDark     : theme.codeTextLight;
            const codeBorder   = isDark ? theme.codeBorderDark   : theme.codeBorderLight;

            return (
              <motion.div
                key={p._id || i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, boxShadow: `0 12px 32px rgba(0,0,0,0.15)` }}
                className="relative overflow-hidden p-5 rounded-xl flex flex-col items-center text-center h-full transition-all duration-200"
                style={{
                  background: t.cardBg,
                  border: `1px solid ${t.cardBorder}`,
                  boxShadow: t.cardShadow,
                }}
              >
                {/* Colored top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
                  style={{ background: theme.topBar }} />

                {/* Faint background icon */}
                <div className="absolute top-2 right-2 pointer-events-none"
                  style={{ color: theme.topBar, opacity: theme.iconOpacity }}>
                  <FiFileText size={72} />
                </div>

                {/* Year + Semester badges */}
                <div className="flex gap-2 mb-4 w-full justify-center relative z-10 mt-3">
                  {/* Year badge — uses theme color */}
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-md text-white"
                    style={{ background: badge }}
                  >
                    {p.year}
                  </span>
                  {/* Semester badge */}
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-md"
                    style={{
                      background: t.semBg,
                      color: t.semText,
                      border: `1px solid ${t.semBorder}`,
                    }}
                  >
                    Sem {p.semester}
                  </span>
                </div>

                {/* ── Module code badge — highlighted ── */}
                <div
                  className="mb-3 text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-widest relative z-10 transition-colors"
                  style={{
                    background: codeBg,
                    color: codeText,
                    border: `1px solid ${codeBorder}`,
                    letterSpacing: '0.1em',
                  }}
                >
                  {p.module?.code || 'CSXXX'}
                </div>

                {/* Module name */}
                <h3
                  className="text-sm font-bold mb-6 flex-grow relative z-10 leading-snug"
                  style={{ color: t.titleClr }}
                >
                  {p.module?.moduleName || 'Unknown Module'}
                </h3>

                {/* Download button */}
                <button
                  onClick={() => handleDownload(p._id)}
                  className="w-full flex justify-center items-center py-2.5 font-bold rounded-lg transition-all relative z-10 text-white text-sm gap-2"
                  style={{
                    background: theme.topBar,
                    boxShadow: `0 4px 12px ${isDark ? theme.codeBorderDark : theme.codeBorderLight}`,
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <FiDownload size={14} /> Download File
                </button>
              </motion.div>
            );
          })}

          {filteredPapers.length === 0 && (
            <div className="col-span-full py-16 text-center">
              <FiFileText size={48} className="mx-auto mb-4" style={{ color: t.emptyIcon, opacity: 0.4 }} />
              <p style={{ color: t.emptyText }}>No past papers found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      )}

      {/* ── Upload Modal ── */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
            onClick={e => e.target === e.currentTarget && setShowUploadModal(false)}
          >
            <motion.div
              initial={{ y: 30, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 30, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl p-6 shadow-2xl"
              style={{ background: t.modalBg, border: `1px solid ${t.modalBorder}` }}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ color: t.modalTitle }}>Upload Past Paper</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: t.cancelBg, color: t.cancelText }}
                  onMouseEnter={e => e.currentTarget.style.background = t.cancelHover}
                  onMouseLeave={e => e.currentTarget.style.background = t.cancelBg}
                >
                  <FiX size={14} />
                </button>
              </div>

              <form
                onSubmit={e => { e.preventDefault(); toast.success('Upload started!'); setShowUploadModal(false); }}
                className="space-y-4"
              >
                {/* Module select */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                    style={{ color: t.labelClr }}>Module</label>
                  <select
                    defaultValue=""
                    className="w-full px-4 py-2.5 rounded-lg focus:outline-none text-sm transition-colors"
                    style={{
                      background: t.inputBg,
                      border: `1px solid ${t.inputBorder}`,
                      color: t.inputText,
                    }}
                    onFocus={e => e.target.style.borderColor = t.inputFocus}
                    onBlur={e => e.target.style.borderColor = t.inputBorder}
                  >
                    <option value="" disabled>Select Module</option>
                    <option value="CS201">CS201 – Data Structures</option>
                    <option value="CS202">CS202 – DBMS</option>
                    <option value="CS203">CS203 – OOP</option>
                    <option value="CS204">CS204 – Networks</option>
                    <option value="CS205">CS205 – OS</option>
                    <option value="CS206">CS206 – Math</option>
                  </select>
                </div>

                {/* Year + Semester */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Year', name: 'year', defaultValue: 2026 },
                    { label: 'Semester', name: 'semester', defaultValue: 1 },
                  ].map(field => (
                    <div key={field.name}>
                      <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                        style={{ color: t.labelClr }}>{field.label}</label>
                      <input
                        type="number"
                        defaultValue={field.defaultValue}
                        className="w-full px-4 py-2.5 rounded-lg focus:outline-none text-sm transition-colors"
                        style={{
                          background: t.inputBg,
                          border: `1px solid ${t.inputBorder}`,
                          color: t.inputText,
                        }}
                        onFocus={e => e.target.style.borderColor = t.inputFocus}
                        onBlur={e => e.target.style.borderColor = t.inputBorder}
                      />
                    </div>
                  ))}
                </div>

                {/* File upload */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5"
                    style={{ color: t.labelClr }}>PDF File</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="w-full px-4 py-2.5 rounded-lg text-sm transition-colors"
                    style={{
                      background: t.inputBg,
                      border: `1px solid ${t.inputBorder}`,
                      color: t.inputText,
                    }}
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4"
                  style={{ borderTop: `1px solid ${t.dividerClr}`, marginTop: '1.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                    style={{ background: t.cancelBg, color: t.cancelText }}
                    onMouseEnter={e => e.currentTarget.style.background = t.cancelHover}
                    onMouseLeave={e => e.currentTarget.style.background = t.cancelBg}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg font-bold text-sm text-white transition-all"
                    style={{ background: t.uploadBtn, boxShadow: '0 4px 14px rgba(109,40,217,0.35)' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    Upload
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PapersPage;

