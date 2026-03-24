import { useState } from 'react';
import { motion } from 'framer-motion';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend
} from 'chart.js';
import { FiTrendingUp, FiActivity, FiTarget, FiAlertCircle, FiCpu, FiCalendar } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const mockProgress = [
  { id: 1, module: 'DSA', code: 'CS201', marks: 85, grade: 'A', progress: 100 },
  { id: 2, module: 'DBMS', code: 'CS202', marks: 72, grade: 'B', progress: 80 },
  { id: 3, module: 'OOP', code: 'CS203', marks: 78, grade: 'A-', progress: 90 },
  { id: 4, module: 'Networks', code: 'CS204', marks: 44, grade: 'C-', progress: 40 },
  { id: 5, module: 'OS', code: 'CS205', marks: 68, grade: 'B-', progress: 70 },
];

const ProgressPage = () => {
  const [analyzing, setAnalyzing] = useState(false);

  const lineData = {
    labels: mockProgress.map(m => m.code),
    datasets: [
      {
        label: 'Marks (%)',
        data: mockProgress.map(m => m.marks),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
        fill: true,
      }
    ]
  };

  const pieData = {
    labels: ['Strong (>70%)', 'Average (50-70%)', 'Weak (<50%)'],
    datasets: [{
      data: [
        mockProgress.filter(m => m.marks > 70).length,
        mockProgress.filter(m => m.marks >= 50 && m.marks <= 70).length,
        mockProgress.filter(m => m.marks < 50).length
      ],
      backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
      borderWidth: 0,
      hoverOffset: 4
    }]
  };

  const handleAIAction = (action) => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      alert(`AI Task: ${action} completed successfully. Insight summary sent to your inbox.`);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      
      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="bg-card border border-border p-5 rounded-xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-muted text-sm font-semibold uppercase">Current GPA</h4>
            <div className="p-2 bg-green/10 text-green rounded-lg"><FiActivity size={18} /></div>
          </div>
          <div className="text-3xl font-bold text-text">3.24</div>
        </motion.div>
        
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className="bg-card border border-border p-5 rounded-xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-muted text-sm font-semibold uppercase">Avg Marks</h4>
            <div className="p-2 bg-primary/10 text-primary rounded-lg"><FiTrendingUp size={18} /></div>
          </div>
          <div className="text-3xl font-bold text-text">69.4%</div>
        </motion.div>

        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="bg-card border border-border p-5 rounded-xl shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-muted text-sm font-semibold uppercase">Total Modules</h4>
            <div className="p-2 bg-purple/10 text-purple rounded-lg"><FiTarget size={18} /></div>
          </div>
          <div className="text-3xl font-bold text-text">5</div>
        </motion.div>

        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.3}} className="bg-card border-red/30 border-2 p-5 rounded-xl shadow-sm hover:shadow-md transition-all bg-red/5">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-red/80 text-sm font-semibold uppercase">Weak Apps</h4>
            <div className="p-2 bg-red/20 text-red rounded-lg"><FiAlertCircle size={18} /></div>
          </div>
          <div className="text-3xl font-bold text-red">1</div>
        </motion.div>
      </div>

      {/* AI Actions */}
      <div className="flex flex-col sm:flex-row gap-4 bg-gradient-to-r from-primary-light to-transparent dark:from-primary/10 p-4 border border-primary/20 rounded-xl">
        <button 
          onClick={() => handleAIAction('Analyze Progress')}
          disabled={analyzing}
          className="flex-1 flex justify-center items-center bg-card border border-border hover:border-primary text-text px-4 py-3 rounded-lg font-semibold shadow-sm transition-all"
        >
          {analyzing ? <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div> : <><FiCpu className="mr-2 text-primary" /> Analyze My Progress</>}
        </button>
        <button 
          onClick={() => handleAIAction('Generate Timetable')}
          disabled={analyzing}
          className="flex-1 flex justify-center items-center bg-primary text-white hover:bg-primary-dark px-4 py-3 rounded-lg font-semibold shadow-sm transition-all"
        >
          <FiCalendar className="mr-2" /> Generate Study Timetable
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border p-6 rounded-xl shadow-sm h-80 flex flex-col">
          <h3 className="text-lg font-bold mb-4 text-text">Marks Trend</h3>
          <div className="relative flex-1 w-full min-h-0">
            <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
        
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm h-80 flex flex-col items-center">
          <h3 className="text-lg font-bold mb-4 text-text w-full text-left">Strengths Profile</h3>
          <div className="relative flex-1 w-full min-h-0 flex justify-center pb-2">
            <Doughnut data={pieData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-lg font-bold text-text">Module Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 border-b border-border">
                <th className="py-3 px-5 text-xs font-semibold text-muted uppercase tracking-wider">Module</th>
                <th className="py-3 px-5 text-xs font-semibold text-muted uppercase tracking-wider">Marks</th>
                <th className="py-3 px-5 text-xs font-semibold text-muted uppercase tracking-wider">Grade</th>
                <th className="py-3 px-5 text-xs font-semibold text-muted uppercase tracking-wider">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockProgress.map(m => (
                <tr key={m.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-semibold text-text">{m.code}</div>
                    <div className="text-xs text-muted">{m.module}</div>
                  </td>
                  <td className="py-4 px-5">
                    <span className={`font-bold ${m.marks < 50 ? 'text-red' : m.marks > 75 ? 'text-green' : 'text-amber'}`}>
                      {m.marks}%
                    </span>
                  </td>
                  <td className="py-4 px-5 font-bold text-text">{m.grade}</td>
                  <td className="py-4 px-5">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 min-w-[100px]">
                      <div className={`h-2 rounded-full ${m.progress < 50 ? 'bg-red' : 'bg-primary'}`} style={{ width: `${m.progress}%` }}></div>
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

export default ProgressPage;
