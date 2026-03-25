import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiSearch, FiX, FiBook } from 'react-icons/fi';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const defaultModules = [
  { _id: '1', code: 'CS201', moduleName: 'Data Structures & Algorithms', credits: 4, year: 2, sem: 1 },
  { _id: '2', code: 'CS202', moduleName: 'Database Management Systems', credits: 3, year: 2, sem: 1 },
  { _id: '3', code: 'CS203', moduleName: 'Object Oriented Programming', credits: 3, year: 2, sem: 1 },
  { _id: '4', code: 'CS204', moduleName: 'Computer Networks', credits: 3, year: 2, sem: 1 },
  { _id: '5', code: 'CS205', moduleName: 'Operating Systems', credits: 3, year: 2, sem: 1 },
  { _id: '6', code: 'CS206', moduleName: 'Discrete Mathematics', credits: 3, year: 2, sem: 1 },
];

const cardThemes = [
  {
    gradient: 'linear-gradient(135deg, #3730a3 0%, #5b21b6 100%)',
    codeBg: 'rgba(255,255,255,0.15)', codeText: '#c7d2fe',
    yearBg: 'rgba(255,255,255,0.12)', yearText: '#c7d2fe',
    titleColor: '#fff', mutedColor: 'rgba(255,255,255,0.7)',
    progressBg: 'rgba(255,255,255,0.18)', progressFill: '#a5b4fc',
    btnBorder: 'rgba(255,255,255,0.35)', btnText: '#e0e7ff',
  },
  {
    gradient: 'linear-gradient(135deg, #0369a1 0%, #0e7490 100%)',
    codeBg: 'rgba(255,255,255,0.15)', codeText: '#bae6fd',
    yearBg: 'rgba(255,255,255,0.12)', yearText: '#bae6fd',
    titleColor: '#fff', mutedColor: 'rgba(255,255,255,0.7)',
    progressBg: 'rgba(255,255,255,0.18)', progressFill: '#7dd3fc',
    btnBorder: 'rgba(255,255,255,0.35)', btnText: '#e0f2fe',
  },
  {
    gradient: 'linear-gradient(135deg, #b45309 0%, #b91c1c 100%)',
    codeBg: 'rgba(255,255,255,0.15)', codeText: '#fde68a',
    yearBg: 'rgba(255,255,255,0.12)', yearText: '#fde68a',
    titleColor: '#fff', mutedColor: 'rgba(255,255,255,0.7)',
    progressBg: 'rgba(255,255,255,0.18)', progressFill: '#fcd34d',
    btnBorder: 'rgba(255,255,255,0.35)', btnText: '#fef3c7',
  },
  {
    gradient: 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
    codeBg: 'rgba(255,255,255,0.15)', codeText: '#a7f3d0',
    yearBg: 'rgba(255,255,255,0.12)', yearText: '#a7f3d0',
    titleColor: '#fff', mutedColor: 'rgba(255,255,255,0.7)',
    progressBg: 'rgba(255,255,255,0.18)', progressFill: '#6ee7b7',
    btnBorder: 'rgba(255,255,255,0.35)', btnText: '#d1fae5',
  },
  {
    gradient: 'linear-gradient(135deg, #9d174d 0%, #be123c 100%)',
    codeBg: 'rgba(255,255,255,0.15)', codeText: '#fbcfe8',
    yearBg: 'rgba(255,255,255,0.12)', yearText: '#fbcfe8',
    titleColor: '#fff', mutedColor: 'rgba(255,255,255,0.7)',
    progressBg: 'rgba(255,255,255,0.18)', progressFill: '#f9a8d4',
    btnBorder: 'rgba(255,255,255,0.35)', btnText: '#fce7f3',
  },
  {
    gradient: 'linear-gradient(135deg, #c2410c 0%, #b45309 100%)',
    codeBg: 'rgba(255,255,255,0.15)', codeText: '#fed7aa',
    yearBg: 'rgba(255,255,255,0.12)', yearText: '#fed7aa',
    titleColor: '#fff', mutedColor: 'rgba(255,255,255,0.7)',
    progressBg: 'rgba(255,255,255,0.18)', progressFill: '#fdba74',
    btnBorder: 'rgba(255,255,255,0.35)', btnText: '#ffedd5',
  },
];

// ── Validation ────────────────────────────────────────────────────
const MODULE_CODE_REGEX = /^[A-Z]{2,4}\d{3,4}$/;

const validateForm = (formData, modules) => {
  const errors = {};
  const code = formData.code.trim().toUpperCase();
  if (!code) {
    errors.code = 'Module code is required.';
  } else if (!MODULE_CODE_REGEX.test(code)) {
    errors.code = 'Format must be 2–4 letters followed by 3–4 digits (e.g. CS201).';
  } else if (modules.some((m) => m.code.toUpperCase() === code)) {
    errors.code = 'A module with this code already exists.';
  }

  const name = formData.moduleName.trim();
  if (!name) {
    errors.moduleName = 'Module name is required.';
  } else if (name.length < 4) {
    errors.moduleName = 'Module name must be at least 4 characters.';
  } else if (name.length > 100) {
    errors.moduleName = 'Module name must not exceed 100 characters.';
  }

  const year = Number(formData.year);
  if (!formData.year && formData.year !== 0) {
    errors.year = 'Year is required.';
  } else if (!Number.isInteger(year) || year < 1 || year > 5) {
    errors.year = 'Year must be between 1 and 5.';
  }

  const sem = Number(formData.sem);
  if (!formData.sem && formData.sem !== 0) {
    errors.sem = 'Semester is required.';
  } else if (!Number.isInteger(sem) || sem < 1 || sem > 3) {
    errors.sem = 'Semester must be 1, 2, or 3.';
  }

  return errors;
};

const FieldError = ({ msg }) =>
  msg ? (
    <p style={{ marginTop: '5px', fontSize: '11px', fontWeight: '500', color: '#dc2626' }}>
      {msg}
    </p>
  ) : null;

// ── Main Component ────────────────────────────────────────────────
const ModulesPage = () => {
  const [modules, setModules] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ code: '', moduleName: '', year: 2, sem: 1 });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => { fetchModules(); }, []);

  const fetchModules = async () => {
    try {
      const res = await api.get('/api/modules');
      setModules(res.data.data.length === 0 ? defaultModules : res.data.data);
    } catch {
      toast.error('Failed to load modules');
      setModules(defaultModules);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (touched[field]) setErrors(validateForm(updated, modules));
  };

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validateForm(formData, modules));
  };

  const handleAddModule = async (e) => {
    e.preventDefault();
    const allTouched = { code: true, moduleName: true, year: true, sem: true };
    setTouched(allTouched);
    const validationErrors = validateForm(formData, modules);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const payload = {
        ...formData,
        code: formData.code.trim().toUpperCase(),
        moduleName: formData.moduleName.trim(),
        year: Number(formData.year),
        sem: Number(formData.sem),
      };
      const res = await api.post('/api/modules', payload);
      setModules([res.data.data, ...modules]);
      toast.success('Module added successfully!');
      handleCloseModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error adding module');
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setFormData({ code: '', moduleName: '', year: 2, sem: 1 });
    setErrors({});
    setTouched({});
  };

  const filteredModules = modules.filter(
    (m) =>
      m.moduleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Always light-mode input styles
  const inputStyle = (field) => ({
    width: '100%',
    padding: '10px 14px',
    fontSize: '14px',
    borderRadius: '10px',
    border: `1.5px solid ${
      touched[field] && errors[field]
        ? '#e24b4a'
        : touched[field] && !errors[field]
        ? '#22c55e'
        : '#e5e7eb'
    }`,
    background: touched[field] && errors[field] ? '#fff5f5' : '#f9fafb',
    color: '#111827',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.15s, background 0.15s',
  });

  const isCodeValid = touched.code && !errors.code;
  const isCodeError = touched.code && errors.code;

  return (
    <div className="space-y-6 animate-fade-in pb-10">

      {/* ── Top Bar ── */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-border rounded-lg w-full focus:outline-none focus:border-primary bg-card text-text"
          />
        </div>

        {/* ── Add Module Button — light style ── */}
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 18px',
            background: '#ffffff',
            border: '1.5px solid #e5e7eb',
            borderRadius: '10px',
            color: '#3730a3',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
            transition: 'background 0.15s, border-color 0.15s',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#eef2ff';
            e.currentTarget.style.borderColor = '#a5b4fc';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ffffff';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}
        >
          {/* small indigo icon box */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '22px', height: '22px', borderRadius: '6px',
            background: 'linear-gradient(135deg, #3730a3, #4f46e5)',
            color: '#fff', flexShrink: 0,
          }}>
            <FiPlus size={13} strokeWidth={2.8} />
          </span>
          Add Module
        </button>
      </div>

      {/* ── Modules Grid ── */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredModules.map((m, i) => {
            const theme = cardThemes[i % cardThemes.length];
            const progress = m.progress || Math.floor(Math.random() * 60 + 20);
            return (
              <motion.div
                key={m._id || i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{ background: theme.gradient }}
                className="relative overflow-hidden p-5 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all flex flex-col h-full"
              >
                <div style={{ background: 'rgba(255,255,255,0.07)' }} className="absolute -top-6 -right-6 w-28 h-28 rounded-full pointer-events-none" />
                <div style={{ background: 'rgba(0,0,0,0.08)' }} className="absolute -bottom-8 -left-6 w-36 h-36 rounded-full pointer-events-none" />

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <span style={{ background: theme.codeBg, color: theme.codeText, borderColor: 'rgba(255,255,255,0.2)' }} className="font-mono text-sm px-2.5 py-1 rounded font-bold border backdrop-blur-sm">
                    {m.code}
                  </span>
                  <span style={{ background: theme.yearBg, color: theme.yearText, borderColor: 'rgba(255,255,255,0.15)' }} className="text-xs font-bold px-2.5 py-1 rounded border backdrop-blur-sm">
                    Y{m.year || 2} S{m.sem || 1}
                  </span>
                </div>

                <h3 style={{ color: theme.titleColor }} className="text-lg font-bold mb-1 line-clamp-2 relative z-10">{m.moduleName}</h3>
                <p style={{ color: theme.mutedColor }} className="text-sm mb-3 flex-grow font-medium relative z-10">Progress: {progress}%</p>

                <div style={{ background: theme.progressBg }} className="w-full rounded-full h-1.5 mb-4 relative z-10">
                  <div style={{ width: `${progress}%`, background: theme.progressFill }} className="h-1.5 rounded-full transition-all duration-500" />
                </div>

                <button style={{ borderColor: theme.btnBorder, color: theme.btnText }} className="w-full py-2.5 text-sm font-bold border rounded-lg transition-colors relative z-10 hover:bg-white/10 backdrop-blur-sm">
                  View Details
                </button>
              </motion.div>
            );
          })}

          {filteredModules.length === 0 && (
            <div className="col-span-full py-16 text-center text-muted">
              <FiSearch size={48} className="mx-auto mb-4 opacity-20" />
              <p>No modules found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      )}

      {/* ── Add Module Modal ── */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(15,15,30,0.55)', backdropFilter: 'blur(4px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) handleCloseModal(); }}
          >
            <motion.div
              initial={{ y: 24, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 24, scale: 0.96, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                width: '100%',
                maxWidth: '460px',
                overflow: 'hidden',
                border: '1px solid #e8e8f0',
                boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
              }}
            >
              {/* Header */}
              <div style={{ background: 'linear-gradient(135deg, #3730a3 0%, #4f46e5 100%)', padding: '24px 28px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{
                      width: '38px', height: '38px', borderRadius: '10px',
                      background: 'rgba(255,255,255,0.18)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '12px',
                    }}>
                      <FiBook size={18} color="rgba(255,255,255,0.9)" />
                    </div>
                    <p style={{ color: '#fff', fontSize: '18px', fontWeight: '600', margin: '0 0 4px', lineHeight: 1.3 }}>
                      Add new module
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: 0 }}>
                      Fill in the details to register a new module.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    style={{
                      background: 'rgba(255,255,255,0.15)', border: 'none',
                      borderRadius: '8px', width: '32px', height: '32px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', color: '#fff', flexShrink: 0,
                    }}
                  >
                    <FiX size={16} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <form onSubmit={handleAddModule} noValidate>
                <div style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                  {/* Module Code */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Module code <span style={{ color: '#e24b4a' }}>*</span>
                      </label>
                      {isCodeValid && (
                        <span style={{ fontSize: '11px', fontWeight: '600', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: '20px' }}>
                          Valid
                        </span>
                      )}
                      {isCodeError && (
                        <span style={{ fontSize: '11px', fontWeight: '600', background: '#fee2e2', color: '#991b1b', padding: '2px 8px', borderRadius: '20px' }}>
                          Invalid
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => handleChange('code', e.target.value)}
                      onBlur={() => handleBlur('code')}
                      placeholder="e.g. CS201"
                      style={inputStyle('code')}
                    />
                    <FieldError msg={touched.code && errors.code} />
                  </div>

                  {/* Module Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                      Module name <span style={{ color: '#e24b4a' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.moduleName}
                      onChange={(e) => handleChange('moduleName', e.target.value)}
                      onBlur={() => handleBlur('moduleName')}
                      placeholder="e.g. Data Structures"
                      style={inputStyle('moduleName')}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                      <FieldError msg={touched.moduleName && errors.moduleName} />
                      <span style={{ fontSize: '11px', color: formData.moduleName.length > 100 ? '#dc2626' : '#9ca3af', marginLeft: 'auto' }}>
                        {formData.moduleName.length}/100
                      </span>
                    </div>
                  </div>

                  {/* Year & Semester */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                        Year <span style={{ color: '#e24b4a' }}>*</span>
                        <span style={{ fontSize: '11px', fontWeight: '400', textTransform: 'none', letterSpacing: 0, marginLeft: '4px', color: '#9ca3af' }}>(1–5)</span>
                      </label>
                      <input
                        type="number"
                        min={1} max={5}
                        value={formData.year}
                        onChange={(e) => handleChange('year', e.target.value)}
                        onBlur={() => handleBlur('year')}
                        style={inputStyle('year')}
                      />
                      <FieldError msg={touched.year && errors.year} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                        Semester <span style={{ color: '#e24b4a' }}>*</span>
                        <span style={{ fontSize: '11px', fontWeight: '400', textTransform: 'none', letterSpacing: 0, marginLeft: '4px', color: '#9ca3af' }}>(1–3)</span>
                      </label>
                      <input
                        type="number"
                        min={1} max={3}
                        value={formData.sem}
                        onChange={(e) => handleChange('sem', e.target.value)}
                        onBlur={() => handleBlur('sem')}
                        style={inputStyle('sem')}
                      />
                      <FieldError msg={touched.sem && errors.sem} />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div style={{
                  padding: '14px 28px 20px',
                  borderTop: '1px solid #f0f0f5',
                  background: '#fafafa',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '10px',
                }}>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    style={{
                      padding: '9px 20px', fontSize: '13px', fontWeight: '500',
                      borderRadius: '9px', border: '1.5px solid #e5e7eb',
                      background: '#fff', color: '#374151', cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '9px 22px', fontSize: '13px', fontWeight: '600',
                      borderRadius: '9px', border: 'none',
                      background: 'linear-gradient(135deg, #3730a3, #4f46e5)',
                      color: '#fff', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '7px',
                      fontFamily: 'inherit',
                    }}
                  >
                    <FiPlus size={15} strokeWidth={2.5} />
                    Add module
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

export default ModulesPage;
