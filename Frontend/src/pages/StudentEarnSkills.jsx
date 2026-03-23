import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDollarSign, FiPlus, FiStar, FiAlertTriangle, FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { checkIntegrity } from '../utils/keywords';

const defaultListings = [
  { id: 1, title: 'DSA Comprehensive Notes', seller: 'John Silva', price: 15.00, category: 'Study Summaries', rating: 4.8 },
  { id: 2, title: 'DBMS Practical Guide', seller: 'Aisha F.', price: 10.00, category: 'Practical Guides', rating: 4.5 },
  { id: 3, title: 'Java Tutoring - 1 Hour', seller: 'Kamal P.', price: 20.00, category: 'Tutoring', rating: 5.0 },
  { id: 4, title: 'Second-hand Networking Book', seller: 'Priya M.', price: 35.00, category: 'Books', rating: 4.2 },
  { id: 5, title: 'OS Mind Maps', seller: 'Nadeesha K.', price: 5.00, category: 'Mind Maps', rating: 4.9 },
  { id: 6, title: 'React Crash Course', seller: 'John Silva', price: 25.00, category: 'Tutoring', rating: 4.7 }
];

const categories = ['Books', 'Revision Notes', 'Practical Guides', 'Mind Maps', 'Study Summaries', 'Tutoring'];

const defaultOrders = [
  { id: 101, item: 'Java Tutoring - 1 Hour', seller: 'Kamal P.', status: 'Active', amount: 20.0 },
  { id: 102, item: 'DSA Comprehensive Notes', seller: 'John Silva', status: 'Completed', amount: 15.0 },
];

const StudentEarnSkills = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', category: 'Notes', price: '', description: '' });

  const handleCreateListing = () => {
    if (!formData.title || !formData.price || !formData.description) {
      return toast.error('Please fill all fields');
    }
    const fullText = formData.title + ' ' + formData.description;
    if (checkIntegrity(fullText)) {
      toast.error('Listing blocked: Contains forbidden academic integrity keywords.');
      return;
    }
    toast.success('Listing created successfully!');
    setShowModal(false);
    setFormData({ title: '', category: 'Notes', price: '', description: '' });
  };

  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold flex items-center"><FiDollarSign className="mr-3 text-green" /> Earn & Skills</h1>
            <p className="mt-1 text-muted">Buy, sell, and offer tutoring or study resources.</p>
          </motion.div>
          <button onClick={() => setShowModal(true)} className="flex items-center bg-green text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-sm">
            <FiPlus className="mr-2" /> New Listing
          </button>
        </div>

        {/* Warning Banner */}
        <div className="bg-amber/10 border border-amber/30 p-4 rounded-xl flex items-start shadow-sm">
          <FiAlertTriangle className="text-amber mt-1 mr-3 flex-shrink-0" size={20} />
          <div>
            <h4 className="font-bold text-amber-dark">⚠️ Academic Integrity Policy</h4>
            <p className="text-sm text-amber-900 mt-1">Assignment completion services, providing exam answers, or any form of cheating are strictly forbidden and will result in immediate suspension.</p>
          </div>
        </div>

        {/* Categories & Search */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex bg-card p-1 rounded-lg border border-border overflow-x-auto whitespace-nowrap shadow-sm">
            <button className="px-4 py-2 text-sm font-semibold rounded-md bg-green text-white shadow">All</button>
            {categories.map(c => <button key={c} className="px-4 py-2 text-sm font-semibold rounded-md text-muted hover:text-text transition-colors">{c}</button>)}
          </div>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
            <input type="text" placeholder="Search marketplace..." className="pl-10 pr-4 py-2 border border-border rounded-lg w-full md:w-64 focus:outline-none focus:border-green" />
          </div>
        </div>

        {/* Marketplace Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {defaultListings.map(l => (
            <div key={l.id} className="bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group">
              <div className="h-32 bg-green/10 flex flex-col justify-end p-4 border-b border-border/50">
                <span className="text-xs font-bold px-2 py-1 bg-white text-green border border-green/20 rounded-full w-max">{l.category}</span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-text mb-1 line-clamp-2">{l.title}</h3>
                <p className="text-sm text-muted mb-3 flex-1">By {l.seller}</p>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-xl font-bold text-green">${l.price.toFixed(2)}</div>
                  <div className="flex items-center text-amber text-sm font-bold">
                    <FiStar className="mr-1 fill-current" /> {l.rating}
                  </div>
                </div>
                <button className="w-full py-2 bg-text text-white font-bold rounded-lg hover:bg-black transition-colors">Purchase</button>
              </div>
            </div>
          ))}
        </div>

        {/* My Orders */}
        <div>
          <h3 className="text-xl font-bold mb-4 mt-8">My Orders (Booking & Tracking)</h3>
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Item</th>
                  <th>Seller</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {defaultOrders.map(o => (
                  <tr key={o.id}>
                    <td className="font-mono text-muted">#{o.id}</td>
                    <td className="font-bold">{o.item}</td>
                    <td>{o.seller}</td>
                    <td className="font-medium">${o.amount.toFixed(2)}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${o.status === 'Active' ? 'tbl-amber' : 'tbl-green'}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Listing Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <motion.div initial={{y:50}} animate={{y:0}} exit={{y:50}} className="bg-card w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
                <h2 className="text-2xl font-bold mb-4">Create New Listing</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-muted mb-1">Title</label>
                    <input type="text" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-green" placeholder="E.g., Complete DSA Notes" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-muted mb-1">Category</label>
                      <select value={formData.category} onChange={e=>setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-green">
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-muted mb-1">Price ($)</label>
                      <input type="number" value={formData.price} onChange={e=>setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-green" placeholder="0.00" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-muted mb-1">Description & Keywords</label>
                    <textarea rows="3" value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-green resize-none" placeholder="Describe what you're offering..."></textarea>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={()=>setShowModal(false)} className="px-4 py-2 text-muted hover:text-text font-medium">Cancel</button>
                  <button onClick={handleCreateListing} className="px-5 py-2 bg-green text-white rounded-lg font-bold hover:bg-green-700">List Item</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default StudentEarnSkills;
