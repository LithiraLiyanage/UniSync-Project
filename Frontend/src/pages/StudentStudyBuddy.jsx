import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBookOpen, FiDownload, FiPlus, FiMessageSquare, FiTrendingUp } from 'react-icons/fi';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const defaultModules = [
  { code: 'CS201', name: 'Data Structures & Algorithms', credits: 4, year: 2, sem: 1 },
  { code: 'CS202', name: 'Database Management Systems', credits: 3, year: 2, sem: 1 },
  { code: 'CS203', name: 'Object Oriented Programming', credits: 3, year: 2, sem: 1 },
  { code: 'CS204', name: 'Computer Networks', credits: 3, year: 2, sem: 1 },
  { code: 'CS205', name: 'Operating Systems', credits: 3, year: 2, sem: 1 },
  { code: 'CS206', name: 'Discrete Mathematics', credits: 3, year: 2, sem: 1 }
];

const defaultPapers = [
  { module: 'CS201 - Data Structures', year: 2025, color: 'purple', sem: 1 },
  { module: 'CS202 - DBMS', year: 2024, color: 'blue', sem: 1 },
  { module: 'CS203 - OOP', year: 2024, color: 'blue', sem: 2 },
  { module: 'CS204 - Networks', year: 2023, color: 'green', sem: 1 },
  { module: 'CS205 - OS', year: 2022, color: 'amber', sem: 2 },
  { module: 'CS206 - Math', year: 2025, color: 'purple', sem: 1 },
];

const StudentStudyBuddy = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('modules');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Mocks for Chatbot
  const [messages, setMessages] = useState([{ sender: 'ai', text: 'Hello! I am your AI Study Assistant. What would you like to learn today?' }]);
  const [chatInput, setChatInput] = useState('');
  const aiReplies = [
    "That's a great question! For CS201, binary trees are essential.",
    "I analyzed your past papers. Focus more on Normalization in DBMS.",
    "Your recent progress in OOP is solid. Keep it up!",
    "I can help generate a timetable for your upcoming Networks exam.",
    "Would you like me to summarize the OS lecture notes?"
  ];

  const handleSend = () => {
    if(!chatInput.trim()) return;
    setMessages([...messages, { sender: 'user', text: chatInput }]);
    setChatInput('');
    setTimeout(() => {
      const reply = aiReplies[Math.floor(Math.random() * aiReplies.length)];
      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 1000);
  };

  const lineData = {
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4'],
    datasets: [{
      label: 'Average Marks', data: [65, 68, 70, 71.4], borderColor: '#4DA8FF', tension: 0.3
    }]
  };

  const pieData = {
    labels: ['Strong', 'Weak'],
    datasets: [{
      data: [4, 1], backgroundColor: ['#10B981', '#EF4444']
    }]
  };

  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold flex items-center"><FiBookOpen className="mr-3 text-primary" /> Study & Learning</h1>
            <p className="mt-1 text-muted">Manage your modules, past papers, and track your progress.</p>
          </motion.div>
          <div className="flex bg-card p-1 rounded-lg border border-border shadow-sm">
            {['modules', 'papers', 'progress', 'chat'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-semibold rounded-md capitalize transition-colors ${activeTab === tab ? 'bg-primary text-white shadow' : 'text-muted hover:text-text'}`}
              >
                {tab === 'chat' ? 'AI Chatbot' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Modules Tab */}
        {activeTab === 'modules' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-6">
            <div className="flex justify-between items-center">
              <input type="text" placeholder="Search modules..." className="px-4 py-2 border border-border rounded-lg w-full max-w-sm focus:outline-none focus:border-primary" />
              <button onClick={() => setShowAddModal(true)} className="flex items-center bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors">
                <FiPlus className="mr-2" /> Add Module
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {defaultModules.map((m, i) => (
                <div key={i} className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:shadow-md transition-all hover:border-primary/30">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-primary/10 text-primary-dark font-mono text-sm px-2 py-1 rounded font-bold">{m.code}</span>
                    <span className="text-xs font-bold text-muted bg-gray-100 px-2 py-1 rounded">Y{m.year} S{m.sem}</span>
                  </div>
                  <h3 className="text-lg font-bold text-text mb-1">{m.name}</h3>
                  <p className="text-sm text-muted mb-4">{m.credits} Credits</p>
                  <button className="w-full py-2 text-primary font-bold border border-primary/20 rounded-lg hover:bg-primary/5 transition-colors">View Details</button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Past Papers Tab */}
        {activeTab === 'papers' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-6">
            <div className="flex justify-between items-center">
              <input type="text" placeholder="Search past papers..." className="px-4 py-2 border border-border rounded-lg w-full max-w-sm focus:outline-none focus:border-primary" />
              <button onClick={() => setShowUploadModal(true)} className="flex items-center bg-purple text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-dark transition-colors">
                <FiPlus className="mr-2" /> Upload Paper
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {defaultPapers.map((p, i) => (
                <div key={i} className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                  <div className="flex gap-2 mb-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded text-white bg-${p.color}`}>{p.year}</span>
                    <span className="text-xs font-bold px-2 py-1 rounded text-red bg-red/10">Sem {p.sem}</span>
                  </div>
                  <h3 className="text-lg font-bold text-text mb-4 mt-2">{p.module}</h3>
                  <button className="flex items-center text-primary font-bold hover:text-primary-dark transition-colors">
                    <FiDownload className="mr-2" /> Download Paper
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-5 rounded-2xl shadow-md">
                <div className="text-sm font-semibold opacity-80 uppercase mb-1">GPA</div>
                <div className="text-4xl font-bold">3.2<span className="text-lg opacity-70">/4.0</span></div>
              </div>
              <div className="bg-card border border-border p-5 rounded-xl shadow-sm">
                <div className="text-sm font-semibold text-muted uppercase mb-1">Average</div>
                <div className="text-3xl font-bold">71.4%</div>
              </div>
              <div className="bg-card border border-border p-5 rounded-xl shadow-sm">
                <div className="text-sm font-semibold text-muted uppercase mb-1">Modules</div>
                <div className="text-3xl font-bold">5</div>
              </div>
              <div className="bg-card border border-red/30 p-5 rounded-xl shadow-sm">
                <div className="text-sm font-semibold text-red uppercase mb-1">Weak Areas</div>
                <div className="text-3xl font-bold text-red">1</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-card border border-border p-6 rounded-xl shadow-sm h-72">
                <h3 className="font-bold mb-4 flex items-center"><FiTrendingUp className="mr-2 text-primary"/> Performance Trend</h3>
                <div className="h-52 relative"><Line data={lineData} options={{maintainAspectRatio:false}} /></div>
              </div>
              <div className="bg-card border border-border p-6 rounded-xl shadow-sm h-72">
                <h3 className="font-bold mb-4 text-center">Modules Split</h3>
                <div className="h-48 relative mx-auto flex justify-center"><Pie data={pieData} options={{maintainAspectRatio:false}} /></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Module Name</th>
                      <th>Marks</th>
                      <th>Progress</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>DSA</td><td>85%</td><td><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-green h-2 rounded-full" style={{width: '85%'}}></div></div></td><td><span className="tbl-green px-2 py-1 rounded-full text-xs font-bold">A</span></td></tr>
                    <tr><td>DBMS</td><td>72%</td><td><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-primary h-2 rounded-full" style={{width: '72%'}}></div></div></td><td><span className="tbl-blue px-2 py-1 rounded-full text-xs font-bold">B+</span></td></tr>
                    <tr><td>OOP</td><td>78%</td><td><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-primary h-2 rounded-full" style={{width: '78%'}}></div></div></td><td><span className="tbl-blue px-2 py-1 rounded-full text-xs font-bold">B+</span></td></tr>
                    <tr><td>Networks</td><td>44%</td><td><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-red h-2 rounded-full" style={{width: '44%'}}></div></div></td><td><span className="tbl-red px-2 py-1 rounded-full text-xs font-bold">C</span></td></tr>
                    <tr><td>OS</td><td>68%</td><td><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-primary h-2 rounded-full" style={{width: '68%'}}></div></div></td><td><span className="tbl-amber px-2 py-1 rounded-full text-xs font-bold">B</span></td></tr>
                  </tbody>
                </table>
              </div>
              <div className="space-y-6">
                <div className="bg-primary-light border border-primary/20 p-5 rounded-xl">
                  <h4 className="font-bold text-primary-dark mb-2">AI Analysis</h4>
                  <p className="text-sm text-primary-dark">Your performance is strong in practical modules (DSA, OOP). However, theoretical concepts in Computer Networks need immediate attention. Consider reviewing OSI layer notes.</p>
                </div>
                <div className="bg-purple-light border border-purple/20 p-5 rounded-xl">
                  <h4 className="font-bold text-purple-dark mb-2">Study Timetable</h4>
                  <ul className="text-sm text-purple-dark space-y-2">
                    <li><span className="font-bold">Mon:</span> DSA & Networks (3 hrs)</li>
                    <li><span className="font-bold">Wed:</span> OOP & OS (3 hrs)</li>
                    <li><span className="font-bold">Fri:</span> DBMS Practice (2 hrs)</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* AI Chatbot Tab */}
        {activeTab === 'chat' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
            <div className="bg-card border border-border rounded-xl flex flex-col lg:col-span-3">
              <div className="p-4 border-b border-border font-bold flex items-center bg-gray-50 rounded-t-xl">
                <FiMessageSquare className="mr-2 text-primary" /> AI Study Assistant
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-2xl max-w-[70%] ${m.sender === 'user' ? 'bg-primary text-white rounded-br-sm' : 'bg-gray-100 text-text rounded-bl-sm'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border bg-gray-50 rounded-b-xl flex gap-2">
                <input 
                  type="text" 
                  value={chatInput} 
                  onChange={e=>setChatInput(e.target.value)}
                  onKeyDown={e=> e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..." 
                  className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:border-primary"
                />
                <button onClick={handleSend} className="bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary-dark transition-colors">Send</button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
                <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-2 flex items-center justify-center text-primary font-bold text-xl">
                  {user?.name?.charAt(0) || 'S'}
                </div>
                <h4 className="font-bold text-center text-text">{user?.name || 'Student'}</h4>
                <p className="text-center text-sm text-muted mb-4">Year {user?.year || 2} · Sem {user?.semester || 1}</p>
                <div className="text-center text-2xl font-bold text-primary">GPA 3.2</div>
              </div>
              <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-sm mb-3 text-muted uppercase">Suggested</h4>
                <div className="space-y-2">
                  <button onClick={()=>setChatInput('Explain binary search trees')} className="w-full text-left text-sm p-2 bg-gray-50 hover:bg-gray-100 rounded border border-border">Explain binary search trees</button>
                  <button onClick={()=>setChatInput('Summarize DBMS Normalization')} className="w-full text-left text-sm p-2 bg-gray-50 hover:bg-gray-100 rounded border border-border">Summarize DBMS Normalization</button>
                  <button onClick={()=>setChatInput('Provide an OS study plan')} className="w-full text-left text-sm p-2 bg-gray-50 hover:bg-gray-100 rounded border border-border">Provide an OS study plan</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Modals */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <motion.div initial={{y:50}} animate={{y:0}} exit={{y:50}} className="bg-card w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
                <h2 className="text-2xl font-bold mb-4">Add Module</h2>
                <div className="space-y-4">
                  <input type="text" placeholder="Module Code (e.g. CS201)" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" />
                  <input type="text" placeholder="Module Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" />
                  <input type="number" placeholder="Credits" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" />
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={()=>setShowAddModal(false)} className="px-4 py-2 text-muted hover:text-text font-medium">Cancel</button>
                  <button onClick={()=>setShowAddModal(false)} className="px-5 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark">Add</button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {showUploadModal && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <motion.div initial={{y:50}} animate={{y:0}} exit={{y:50}} className="bg-card w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
                <h2 className="text-2xl font-bold mb-4">Upload Past Paper</h2>
                <div className="space-y-4">
                  <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" defaultValue="">
                    <option value="" disabled>Select Module</option>
                    {defaultModules.map(m => <option key={m.code}>{m.code} - {m.name}</option>)}
                  </select>
                  <input type="number" placeholder="Year" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-primary" />
                  <input type="file" accept="application/pdf" className="w-full px-4 py-2 border rounded-lg text-sm" />
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button onClick={()=>setShowUploadModal(false)} className="px-4 py-2 text-muted hover:text-text font-medium">Cancel</button>
                  <button onClick={()=>setShowUploadModal(false)} className="px-5 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark">Upload</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default StudentStudyBuddy;
