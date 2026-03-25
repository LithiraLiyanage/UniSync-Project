import { useState } from 'react';
import { motion } from 'framer-motion';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend
} from 'chart.js';
import { FiTrendingUp, FiActivity, FiTarget, FiAlertCircle, FiCpu, FiCalendar } from 'react-icons/fi';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const MODULE_COLORS = {
  violet:  { bar: 'bg-violet-500',  badge: 'bg-violet-200 text-violet-900 dark:bg-violet-800 dark:text-violet-100', dot: 'bg-violet-500' },
  sky:     { bar: 'bg-sky-500',     badge: 'bg-sky-200 text-sky-900 dark:bg-sky-800 dark:text-sky-100',             dot: 'bg-sky-500' },
  emerald: { bar: 'bg-emerald-500', badge: 'bg-emerald-200 text-emerald-900 dark:bg-emerald-800 dark:text-emerald-100', dot: 'bg-emerald-500' },
  rose:    { bar: 'bg-rose-500',    badge: 'bg-rose-200 text-rose-900 dark:bg-rose-800 dark:text-rose-100',          dot: 'bg-rose-500' },
  amber:   { bar: 'bg-amber-500',   badge: 'bg-amber-200 text-amber-900 dark:bg-amber-800 dark:text-amber-100',     dot: 'bg-amber-500' },
};

const mockProgress = [
  { id: 1, module: 'DSA',      code: 'CS201', marks: 85, grade: 'A',  progress: 100, color: 'violet' },
  { id: 2, module: 'DBMS',     code: 'CS202', marks: 72, grade: 'B',  progress: 80,  color: 'sky' },
  { id: 3, module: 'OOP',      code: 'CS203', marks: 78, grade: 'A-', progress: 90,  color: 'emerald' },
  { id: 4, module: 'Networks', code: 'CS204', marks: 44, grade: 'C-', progress: 40,  color: 'rose' },
  { id: 5, module: 'OS',       code: 'CS205', marks: 68, grade: 'B-', progress: 70,  color: 'amber' },
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

        {/* Current GPA — Emerald */}
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}}
          className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-all relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
          <div className="flex justify-between items-start mb-3">
            <h4 className="text-black dark:text-white text-sm font-extrabold uppercase tracking-wide">Current GPA</h4>
            <div className="p-3 bg-emerald-500 text-white rounded-xl shadow-md">
              <FiActivity size={20} />
            </div>
          </div>
          <div className="text-4xl font-black text-black dark:text-white">3.24</div>
        </motion.div>

        {/* Avg Marks — Sky */}
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.1}}
          className="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-all relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-sky-500" />
          <div className="flex justify-between items-start mb-3">
            <h4 className="text-black dark:text-white text-sm font-extrabold uppercase tracking-wide">Avg Marks</h4>
            <div className="p-3 bg-sky-500 text-white rounded-xl shadow-md">
              <FiTrendingUp size={20} />
            </div>
          </div>
          <div className="text-4xl font-black text-black dark:text-white">69.4%</div>
        </motion.div>

        {/* Total Modules — Violet */}
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.2}}
          className="bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-all relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-violet-500" />
          <div className="flex justify-between items-start mb-3">
            <h4 className="text-black dark:text-white text-sm font-extrabold uppercase tracking-wide">Total Modules</h4>
            <div className="p-3 bg-violet-500 text-white rounded-xl shadow-md">
              <FiTarget size={20} />
            </div>
          </div>
          <div className="text-4xl font-black text-black dark:text-white">5</div>
        </motion.div>

        {/* Weak Modules — Rose */}
        <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay:0.3}}
          className="bg-rose-100 dark:bg-rose-900/30 border-2 border-rose-300 dark:border-rose-700 p-5 rounded-xl shadow-sm hover:shadow-md transition-all relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-rose-500" />
          <div className="flex justify-between items-start mb-3">
            <h4 className="text-black dark:text-white text-sm font-extrabold uppercase tracking-wide">Weak Modules</h4>
            <div className="p-3 bg-rose-500 text-white rounded-xl shadow-md">
              <FiAlertCircle size={20} />
            </div>
          </div>
          <div className="text-4xl font-black text-black dark:text-white">1</div>
        </motion.div>

      </div>

      {/* AI Actions */}
      <div className="flex flex-col sm:flex-row gap-4 bg-gradient-to-r from-violet-50 to-sky-50 dark:from-violet-900/20 dark:to-sky-900/20 p-4 border border-violet-200 dark:border-violet-800/50 rounded-xl">
        <button
          onClick={() => handleAIAction('Analyze Progress')}
          disabled={analyzing}
          className="flex-1 flex justify-center items-center bg-white dark:bg-violet-900/30 border-2 border-violet-300 dark:border-violet-600 hover:bg-violet-500 hover:border-violet-500 hover:text-white text-violet-800 dark:text-violet-200 px-4 py-3 rounded-lg font-bold shadow-sm transition-all"
        >
          {analyzing ? <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div> : <><FiCpu className="mr-2" /> Analyze My Progress</>}
        </button>
        <button
          onClick={() => handleAIAction('Generate Timetable')}
          disabled={analyzing}
          className="flex-1 flex justify-center items-center bg-sky-500 hover:bg-sky-600 text-white border-2 border-sky-500 hover:border-sky-600 px-4 py-3 rounded-lg font-bold shadow-sm transition-all"
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
                <th className="py-3 px-5 text-xs font-semibold text-white uppercase tracking-wider">Module</th>
                <th className="py-3 px-5 text-xs font-semibold text-white uppercase tracking-wider">Marks</th>
                <th className="py-3 px-5 text-xs font-semibold text-white uppercase tracking-wider">Grade</th>
                <th className="py-3 px-5 text-xs font-semibold text-white uppercase tracking-wider">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockProgress.map(m => {
                const theme = MODULE_COLORS[m.color] || MODULE_COLORS.violet;
                return (
                  <tr key={m.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${theme.dot}`} />
                        <div>
                          <span className={`text-sm font-extrabold px-2 py-0.5 rounded uppercase tracking-wide ${theme.badge}`}>
                            {m.code}
                          </span>
                          <div className="text-xs text-muted mt-0.5">{m.module}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`font-bold ${m.marks < 50 ? 'text-rose-500' : m.marks > 75 ? 'text-emerald-500' : 'text-amber-500'}`}>
                        {m.marks}%
                      </span>
                    </td>
                    <td className="py-4 px-5 font-bold text-text">{m.grade}</td>
                    <td className="py-4 px-5">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 min-w-[100px]">
                        <div className={`h-2 rounded-full ${theme.bar}`} style={{ width: `${m.progress}%` }} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default ProgressPage;




