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
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await api.get('/api/resources');
      if (res.data.data.length === 0) {
        setResources(defaultResources);
      } else {
        setResources(res.data.data);
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
        <div className="relative w-full max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-border rounded-lg w-full focus:outline-none focus:border-primary bg-card text-text"
          />
        </div>

        {/* Type Filter — colored active tabs */}
        <div className="flex bg-card border border-border rounded-lg p-1 overflow-x-auto w-full sm:w-auto gap-1">
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
                        boxShadow: `0 2px 8px ${theme.shadow}`,
                      }
                    : {}
                }
                className={`px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-all ${
                  isActive
                    ? 'shadow-sm'
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
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-amber/20 border-t-amber rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredResources.map((r, i) => (
            <motion.div
              key={r._id || i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border p-5 rounded-xl shadow-sm hover:shadow-md transition-all group flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-xl shrink-0 dark:bg-gray-800 border border-border">
                {resourceIcons[r.type] || <FiFileText className="text-muted" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-bold text-amber-600 bg-amber/10 px-2 py-0.5 rounded uppercase">
                    {r.module?.code || 'GEN'}
                  </span>
                  <span className="text-xs capitalize text-muted">{r.type}</span>
                </div>
                <h3 className="text-md font-bold text-text mb-2 line-clamp-2" title={r.title}>{r.title}</h3>

                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors mt-1"
                >
                  Access Resource <FiExternalLink className="ml-1" />
                </a>
              </div>
            </motion.div>
          ))}

          {filteredResources.length === 0 && (
            <div className="col-span-full py-16 text-center text-muted">
              <FiBookOpen size={48} className="mx-auto mb-4 opacity-20" />
              <p>No resources found for your criteria.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default ResourcesPage;

