import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDollarSign, FiCheckCircle, FiXCircle, FiAlertTriangle, FiEye } from 'react-icons/fi';
import toast from 'react-hot-toast';

const initialListings = [
  { id: 101, title: 'DSA Comprehensive Notes', seller: 'S1092', price: 15.00, category: 'Study Summaries', status: 'Pending', flagged: false },
  { id: 102, title: 'Exam Answers for CS202', seller: 'S9921', price: 50.00, category: 'Revision Notes', status: 'Pending', flagged: true },
  { id: 103, title: 'Java Tutoring - 1 Hour', seller: 'S8293', price: 20.00, category: 'Tutoring', status: 'Approved', flagged: false }
];

const AdminEarnSkills = () => {
  const [listings, setListings] = useState(initialListings);

  const handleApprove = (id) => {
    setListings(listings.map(l => l.id === id ? { ...l, status: 'Approved' } : l));
    toast.success('Listing approved');
  };

  const handleReject = (id) => {
    setListings(listings.map(l => l.id === id ? { ...l, status: 'Rejected' } : l));
    toast.error('Listing rejected');
  };

  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold flex items-center"><FiDollarSign className="mr-3 text-green" /> Earn & Skills Moderation</h1>
            <p className="mt-1 text-muted">Review marketplace listings, check for academic integrity violations, and manage approvals.</p>
          </motion.div>
        </div>

        {/* Top Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border p-5 rounded-xl shadow-sm">
            <h4 className="text-muted text-sm font-semibold uppercase mb-2">Pending Review</h4>
            <div className="text-3xl font-bold text-amber">24</div>
          </div>
          <div className="bg-red/10 border border-red/20 p-5 rounded-xl shadow-sm text-red-dark">
            <h4 className="text-sm font-semibold uppercase mb-2 flex items-center"><FiAlertTriangle className="mr-2"/> System Flagged</h4>
            <div className="text-3xl font-bold">3</div>
          </div>
          <div className="bg-card border border-border p-5 rounded-xl shadow-sm">
            <h4 className="text-muted text-sm font-semibold uppercase mb-2">Active Listings</h4>
            <div className="text-3xl font-bold text-green">142</div>
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden mt-4">
          <div className="p-4 border-b border-border bg-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-bold">Recent Listings</h3>
            <select className="px-3 py-1.5 border border-border rounded-lg text-sm focus:outline-none focus:border-green">
              <option>All Statuses</option>
              <option>Pending</option>
              <option>System Flagged</option>
            </select>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Listing ID</th>
                <th>Title</th>
                <th>Seller ID</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map(l => (
                <tr key={l.id} className={l.flagged && l.status === 'Pending' ? 'bg-red/5' : ''}>
                  <td className="font-mono font-bold text-muted">#{l.id}</td>
                  <td className="font-semibold text-text">
                    {l.title}
                    {l.flagged && <span className="ml-2 inline-flex items-center text-xs text-white bg-red px-2 py-0.5 rounded-full"><FiAlertTriangle className="mr-1"/> Flagged for Integrity</span>}
                  </td>
                  <td>{l.seller}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${l.status === 'Pending' ? 'tbl-amber' : l.status === 'Approved' ? 'tbl-green' : 'tbl-red'}`}>
                      {l.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                       <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View Details"><FiEye/></button>
                      {l.status === 'Pending' && (
                        <>
                          <button onClick={() => handleApprove(l.id)} className="p-2 text-green bg-green/10 hover:bg-green/20 rounded-lg" title="Approve"><FiCheckCircle/></button>
                          <button onClick={() => handleReject(l.id)} className="p-2 text-red bg-red/10 hover:bg-red/20 rounded-lg" title="Reject"><FiXCircle/></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminEarnSkills;
