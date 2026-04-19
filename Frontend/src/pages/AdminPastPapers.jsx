import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFileText, FiPlus, FiTrash2, FiSearch, FiX, FiFilter, FiStar, FiDownload, FiInfo, FiMessageSquare } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../api/axios';

const AdminPastPapers = () => {
  const [papers, setPapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Modal states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    year: new Date().getFullYear(),
    examType: 'University',
    description: ''
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('/api/pastpapers');
      if (data.success) {
        setPapers(data.data);
      }
    } catch (error) {
      toast.error('Failed to load past papers');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('title', formData.title);
    uploadData.append('subject', formData.subject);
    uploadData.append('year', formData.year);
    uploadData.append('examType', formData.examType);
    uploadData.append('description', formData.description);
    uploadData.append('file', file);

    try {
      const { data } = await api.post('/api/pastpapers', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (data.success) {
        toast.success('Past paper uploaded successfully');
        setShowUploadModal(false);
        setFile(null);
        setFormData({ title: '', subject: '', year: new Date().getFullYear(), examType: 'University', description: '' });
        fetchPapers();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to upload paper');
    }
  };

  const handleDeletePaper = async (id) => {
    if (!window.confirm('Are you sure you want to delete this paper?')) return;
    try {
      const { data } = await api.delete(`/api/pastpapers/${id}`);
      if (data.success) {
        toast.success('Paper deleted successfully');
        setPapers(papers.filter(p => p._id !== id));
      }
    } catch (error) {
      toast.error('Failed to delete paper');
    }
  };

  const handleViewReviews = async (paper) => {
    setSelectedPaper(paper);
    setShowReviewsModal(true);
    setIsReviewsLoading(true);
    try {
      const { data } = await api.get(`/api/reviews/${paper._id}`);
      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      toast.error('Failed to load reviews');
    } finally {
      setIsReviewsLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      const { data } = await api.delete(`/api/reviews/${reviewId}`);
      if (data.success) {
        toast.success('Review deleted');
        setReviews(reviews.filter(r => r._id !== reviewId));
      }
    } catch (error) {
      toast.error('Failed to delete review');
    }
  };

  const filteredPapers = papers.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 pt-28 pb-12 px-6 md:px-8 overflow-y-auto w-full min-h-screen bg-slate-50 dark:bg-[var(--bg)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Past Papers Library
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base">
              Securely manage and review uploaded past examination papers.
            </p>
          </motion.div>
          
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95"
          >
            <FiPlus size={20} /> Upload New Paper
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/50 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by title or subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-slate-200 transition-shadow"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors w-full sm:w-auto">
            <FiFilter /> Filters
          </button>
        </div>

        {/* Papers Grid/List */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-2xl shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-slate-500">Loading papers...</div>
          ) : filteredPapers.length === 0 ? (
            <div className="p-16 flex flex-col items-center justify-center text-slate-400">
              <FiFileText size={48} className="mb-4 opacity-50" />
              <p className="text-lg font-bold text-slate-600 dark:text-slate-300">No past papers found</p>
              <p className="text-sm mt-1">Upload a new paper to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-slate-500">Title & Subject</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-slate-500">Details</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-slate-500">Uploaded Date</th>
                    <th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-slate-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {filteredPapers.map(paper => (
                    <tr key={paper._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 rounded-xl">
                            <FiFileText size={24} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 dark:text-slate-200 relative top-[2px]">{paper.title}</p>
                            <p className="text-sm font-medium text-slate-500">{paper.subject}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 w-fit">
                            {paper.examType}
                          </span>
                          <span className="text-xs font-bold text-slate-500">Year: {paper.year}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-500">
                        {new Date(paper.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleViewReviews(paper)}
                            className="p-2 text-slate-400 hover:text-purple-600 bg-transparent hover:bg-purple-50 dark:hover:bg-purple-900/40 rounded-lg transition-colors"
                            title="View Reviews"
                          >
                            <FiMessageSquare size={18} />
                          </button>
                          <a 
                            href={`http://localhost:5000${paper.fileUrl}`} 
                            target="_blank" rel="noopener noreferrer"
                            className="p-2 text-slate-400 hover:text-blue-600 bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/40 rounded-lg transition-colors"
                            title="Download"
                          >
                            <FiDownload size={18} />
                          </a>
                          <button 
                            onClick={() => handleDeletePaper(paper._id)}
                            className="p-2 text-slate-400 hover:text-red-600 bg-transparent hover:bg-red-50 dark:hover:bg-red-900/40 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Upload Modal */}
        <AnimatePresence>
          {showUploadModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                  <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg"><FiFileText /></div>
                    Upload Past Paper
                  </h2>
                  <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2"><FiX size={24}/></button>
                </div>
                
                <form onSubmit={handleUpload} className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Paper Title</label>
                      <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-slate-200" placeholder="e.g. 2023 Final Examination" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject</label>
                        <input required type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-slate-200" placeholder="e.g. Mathematics" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Year</label>
                        <input required type="number" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-slate-200" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Exam Type</label>
                      <select required value={formData.examType} onChange={e => setFormData({...formData, examType: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-slate-200">
                        <option value="A/L">A/L</option>
                        <option value="O/L">O/L</option>
                        <option value="University">University</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description / Notes</label>
                      <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="2" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-800 dark:text-slate-200 resize-none"></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">File Upload (PDF)</label>
                      <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                        <input required type="file" accept=".pdf,.doc,.docx" onChange={e => setFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        <FiDownload size={32} className="text-slate-400 mb-2 group-hover:text-blue-500 transition-colors" />
                        <p className="text-sm font-bold text-slate-600 dark:text-slate-300">{file ? file.name : 'Click or drag file to upload'}</p>
                        <p className="text-xs font-medium text-slate-500 mt-1">PDF, DOC up to 10MB</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3 mt-6">
                    <button type="button" onClick={() => setShowUploadModal(false)} className="px-5 py-2.5 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">Cancel</button>
                    <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md">Upload Paper</button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Modal */}
        <AnimatePresence>
          {showReviewsModal && selectedPaper && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.95, x: 20 }} animate={{ scale: 1, x: 0 }} exit={{ scale: 0.95, x: 20 }} className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-[85vh] flex flex-col">
                <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 shrink-0">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                       <FiMessageSquare className="text-purple-600"/> Paper Reviews
                    </h2>
                    <p className="text-sm font-medium text-slate-500 mt-1">{selectedPaper.title}</p>
                  </div>
                  <button onClick={() => setShowReviewsModal(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2"><FiX size={24}/></button>
                </div>
                
                <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                  {isReviewsLoading ? (
                    <div className="text-center py-8 text-slate-500">Loading reviews...</div>
                  ) : reviews.length === 0 ? (
                    <div className="text-center py-12 flex flex-col items-center justify-center">
                      <FiStar size={40} className="text-slate-300 dark:text-slate-600 mb-3" />
                      <p className="font-bold text-slate-500">No reviews yet for this paper.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {reviews.map(review => (
                        <div key={review._id} className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
                                {review.userId?.name?.[0] || 'U'}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{review.userId?.name || 'Unknown User'}</p>
                                <div className="flex gap-1 text-yellow-400 shrink-0 mt-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <FiStar key={i} fill={i < review.rating ? "currentColor" : "none"} size={12} className={i < review.rating ? "" : "text-slate-300 dark:text-slate-600"}/>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <button 
                              onClick={() => handleDeleteReview(review._id)}
                              className="text-slate-400 hover:text-red-500 transition-colors p-1"
                              title="Delete Review"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50">
                            {review.comment}
                          </p>
                          <p className="text-xs font-medium text-slate-400 mt-2 text-right">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default AdminPastPapers;
