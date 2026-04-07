import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiSearch, FiVideo, FiFileText, FiBookOpen, FiTool } from 'react-icons/fi';
import api from '../../api/axios';
import toast from 'react-hot-toast';

const defaultResources = [
  { _id: '1', title: 'Calculus Complete Course', type: 'video', url: '#', module: { code: 'CS206' } },
  { _id: '2', title: 'Operating Systems Concepts', type: 'document', url: '#', module: { code: 'CS205' } },
  { _id: '3', title: 'React Hooks Guide', type: 'article', url: '#', module: { code: 'CS203' } },
  { _id: '4', title: 'Regex Tester', type: 'tool', url: '#', module: { code: 'CS201' } },
];

const resourceIcons = {
  video: <FiVideo className="text-red-500" />,
  document: <FiFileText className="text-blue-500" />,
  article: <FiBookOpen className="text-green-500" />,
  tool: <FiTool className="text-amber-500" />,
};

// Color theme for each filter tab: [active bg, active text, ring/border color]
const filterThemes = {
  all:      { bg: '#6366f1', text: '#fff', shadow: 'rgba(99,102,241,0.35)' },
  video:    { bg: '#ef4444', text: '#fff', shadow: 'rgba(239,68,68,0.35)'  },
  document: { bg: '#3b82f6', text: '#fff', shadow: 'rgba(59,130,246,0.35)' },
  article:  { bg: '#10b981', text: '#fff', shadow: 'rgba(16,185,129,0.35)' },
  tool:     { bg: '#f59e0b', text: '#fff', shadow: 'rgba(245,158,11,0.35)' },
};

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay for loading skeleton demo
    setTimeout(() => {
      fetchResources();
    }, 800);
  }, []);

  const fetchResources = async () => {
    try {
      const res = await api.get('/api/resources');
      if (res?.data?.data?.length === 0) {
        setResources(defaultResources);
      } else {
        setResources(res.data.data || defaultResources);
      }
    } catch (err) {
      toast.error('Failed to load resources');
      setResources(defaultResources);
    } finally {
      setLoading(false);
    }
  };

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (r.module?.code || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || r.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-10">

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full max-w-md group">
          <FiSearch className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted transition-colors group-focus-within:text-blue-500" />
          <input
            type="text"
            placeholder="Search by title or module code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 border border-border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-card text-text shadow-sm transition-all"
          />
        </div>

        {/* Type Filter — colored active tabs */}
        <div className="flex bg-card border border-border rounded-xl p-1 overflow-x-auto w-full sm:w-auto gap-1 shadow-sm">
          {['all', 'video', 'document', 'article', 'tool'].map(type => {
            const isActive = filterType === type;
            const theme = filterThemes[type];
            return (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                style={
                  isActive
                    ? {
                        background: theme.bg,
                        color: theme.text,
                        boxShadow: `0 4px 12px ${theme.shadow}`,
                      }
                    : {}
                }
                className={`px-4 py-1.5 rounded-lg text-sm font-bold capitalize transition-all duration-300 ${
                  isActive
                    ? 'scale-105'
                    : 'text-muted hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-text'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Resources Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((skel) => (
            <div key={skel} className="bg-card border border-border p-5 rounded-2xl animate-pulse">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-xl shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between">
                    <div className="w-16 h-5 bg-gray-200 dark:bg-gray-700 rounded-md" />
                    <div className="w-12 h-5 bg-gray-200 dark:bg-gray-700 rounded-md" />
                  </div>
                  <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-md" />
                  <div className="w-2/3 h-4 bg-gray-200 dark:bg-gray-700 rounded-md" />
                </div>
              </div>
              <div className="mt-5 w-full h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredResources.map((r, i) => {
            const themeColors = {
              video:    { bg: 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20',     iconBg: 'bg-red-100 dark:bg-red-900/40',       iconText: 'text-red-600 dark:text-red-400',       btn: 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600' },
              document: { bg: 'from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20',         iconBg: 'bg-blue-100 dark:bg-blue-900/40',     iconText: 'text-blue-600 dark:text-blue-400',     btn: 'bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600' },
              article:  { bg: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20', iconBg: 'bg-emerald-100 dark:bg-emerald-900/40', iconText: 'text-emerald-600 dark:text-emerald-400', btn: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600' },
              tool:     { bg: 'from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20', iconBg: 'bg-amber-100 dark:bg-amber-900/40',   iconText: 'text-amber-600 dark:text-amber-400',   btn: 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600' },
            };

            const t = themeColors[r.type] || themeColors.document;

            return (
              <motion.div
                key={r._id || i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.03 }}
                className={`bg-gradient-to-br ${t.bg} border border-border p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between min-h-[160px]`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-full ${t.iconBg} ${t.iconText} flex items-center justify-center text-2xl shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                    {resourceIcons[r.type] || <FiFileText />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1.5">
                      <span className="text-[10px] font-black text-white bg-slate-800 dark:bg-slate-700 px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
                        {r.module?.code || 'GEN'}
                      </span>
                      <span className={`text-xs font-bold capitalize px-2 py-0.5 rounded-full ${t.iconBg} ${t.iconText}`}>
                        {r.type}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-tight mb-2 line-clamp-2" title={r.title}>
                      {r.title}
                    </h3>
                  </div>
                </div>

                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex justify-center items-center py-2.5 text-sm font-bold text-white rounded-xl shadow-md transition-all duration-300 transform group-hover:-translate-y-0.5 ${t.btn}`}
                >
                  Open Resource <FiExternalLink className="ml-2" />
                </a>
              </motion.div>
            );
          })}

          {filteredResources.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-card border border-border rounded-2xl border-dashed">
              <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex justify-center items-center mb-4">
                <FiSearch size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-text mb-2">No resources found</h3>
              <p className="text-muted max-w-md">
                We couldn't find any {filterType !== 'all' ? filterType : ''} resources matching "{searchTerm}". Try adjusting your search filters.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default ResourcesPage;

